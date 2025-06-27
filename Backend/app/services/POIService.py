import os

import faiss, numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from functools import lru_cache

from sqlalchemy.util import await_only

from app.models.dtoModels.POIOutDTO import POIOutDTO

# ── Параметры ──
REPO_ROOT   = os.path.abspath(os.path.join(os.path.dirname(__file__),"..","..",".."))
INDEX_FILE  = os.path.join(REPO_ROOT, "DLS", "Indexes", "poi_ivfpq.index")
META_FILE = os.path.join(REPO_ROOT, "DLS", "Dataset", "poi_dataset_enriched_incremental.csv")
EMBED_MODEL  = "sentence-transformers/LaBSE"
DEVICE       = "cpu"
NLIST_PROBE  = 50      # увеличил nprobe для точности
TOP_N        = 10
EXPAND_K     = 1000    # расширил кандидатов
# ─────────────

# 1) Загружаем индекс
index = faiss.read_index(INDEX_FILE)
index.nprobe = NLIST_PROBE

# 2) Загружаем метаданные
df = pd.read_csv(META_FILE, dtype=str)
# допустим колонки: id, name, city, type, lat, lon, enriched_description
df = df.set_index("id")

# 3) Модель эмбеддинга
embedder = SentenceTransformer(EMBED_MODEL, device=DEVICE)
@lru_cache(maxsize=512)
def encode_query(q: str):
    v = embedder.encode([q], convert_to_numpy=True)
    faiss.normalize_L2(v)
    return v

# 4) Улучшенная функция поиска
def search_in_city(query: str, city: str, top_n=TOP_N, expand_k=EXPAND_K) -> list[POIOutDTO]:
    qv = encode_query(query)
    D, I = index.search(qv, expand_k)   # массивы shape=(1, expand_k)
    D, I = D[0], I[0]

    results = []
    for score, emb_idx in zip(D, I):
        poi_id = df.index[emb_idx]
        row = df.loc[poi_id]
        if row["city"] != city:
            continue


        res = POIOutDTO(
            id=poi_id,
            name=row["name"],
            type=row["type"],
            city=city,
            lat=float(row["lat"]),
            lon=float(row["lon"]),
            score=float(score),
            description=row["enriched_description"],
        )
        results.append(res)
        if len(results) >= top_n:
            break
    return results
