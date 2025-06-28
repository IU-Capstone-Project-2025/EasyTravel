# app/services/POIService.py
import os
import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from functools import lru_cache
from typing import List, Optional

from app.config.interest_tags import interest_tags
from app.models import InterestsEnum
from app.models.dtoModels.POIOutDTO import POIOutDTO

# ───────────── конфиг ─────────────
REPO_ROOT    = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
INDEX_FILE   = os.path.join(REPO_ROOT, "DLS", "Indexes", "poi_ivfpq.index")
META_FILE    = os.path.join(REPO_ROOT, "DLS", "Dataset", "poi_dataset_enriched_incremental.csv")
EMBED_MODEL  = "sentence-transformers/LaBSE"
DEVICE       = "cpu"
NLIST_PROBE  = 50
TOP_N        = 10
EXPAND_K     = 1000
# ──────────────────────────────────

# 1) читаем FAISS и метаданные
index = faiss.read_index(INDEX_FILE)
index.nprobe = NLIST_PROBE
df = pd.read_csv(META_FILE, dtype=str).set_index("id")

# 2) создаём embedder
embedder = SentenceTransformer(EMBED_MODEL, device=DEVICE)

# 3) синхронная кэшированная функция
@lru_cache(maxsize=512)
def encode_query(q: str) -> np.ndarray:
    v = embedder.encode([q], convert_to_numpy=True)
    faiss.normalize_L2(v)
    return v

class POIService:
    city_map = {
        "Moscow": "Москва",
        "Saint Petersburg": "Санкт-Петербург",
        "Nizhny Novgorod": "Нижний Новгород",
        "Ekaterinburg": "Екатеринбург",
        "Kazan": "Казань",
        "Ufa": "Уфа",
    }

    def search_in_city(
        self,
        query: str,
        city: Optional[str],
            tags: Optional[List[str]] = None,
            top_n: int = TOP_N,
            expand_k: int = EXPAND_K
    ) -> List[POIOutDTO]:
        if city and city in self.city_map:
            city = self.city_map[city]

        qv = encode_query(query)                      # (1×D)
        D, I = index.search(qv, expand_k)             # ищем по всему индексу
        D, I = D[0], I[0]

        results: List[POIOutDTO] = []
        for score, emb_idx in zip(D, I):
            row = df.iloc[emb_idx]
            poi_id = row.name
            if city is not None and row["city"] != city:
                continue
            if tags:
                poi_tags = set(row["tags"].split(","))
                if not any(t in poi_tags for t in tags):
                    continue

            results.append(POIOutDTO(
                id=poi_id,
                name=row["name"],
                type=row["type"],
                city=row["city"],
                lat=float(row["lat"]),
                lon=float(row["lon"]),
                score=float(score),
                description=row["enriched_description"],
            ))
            if len(results) >= top_n:
                break

        return results

    def recommend_by_interests(
            self,
            interests: List[InterestsEnum],
            additional_interests: Optional[str],
            city: Optional[str],
            top_n: int = TOP_N
    ) -> List[POIOutDTO]:
        seen = set()
        recs = []

        # Собираем поток интересов
        pool = list(interests)
        if additional_interests:
            pool.append(additional_interests)

        for intr in pool:
            # Определяем текстовый запрос
            if isinstance(intr, InterestsEnum):
                text_query = intr.value.replace("_", " ")
                key = intr.value
            else:
                text_query = str(intr).replace("_", " ")
                key = str(intr)

            # Берём теги для этого интереса (если есть)
            tags = interest_tags.get(key, [])

            # Сколько ещё нужно докинуть
            remaining = top_n - len(recs)
            if remaining <= 0:
                break

            # Ищем ровно remaining
            hits = self.search_in_city(text_query, city, tags=tags, top_n=remaining)

            for poi in hits:
                if poi.id not in seen:
                    seen.add(poi.id)
                    recs.append(poi)
                    if len(recs) >= top_n:
                        return recs

        return recs


# синглтон-сервис
poi_service = POIService()
