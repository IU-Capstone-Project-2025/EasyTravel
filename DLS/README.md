# DLS (Data & Search) README

This directory contains all data assets, index files, and core search logic (embeddings + FAISS) for the EasyTravel POI search service. You’ll find:

- **Dataset** (raw and enriched POI metadata)  
- **Indexes** (prebuilt FAISS indices)  
- **Core search code** (embedding & indexing utilities)  
- **Experiments** (benchmarks and metric scripts)

---

## 📂 Structure

```

DLS/
├── Dataset/
│   ├── poi\_dataset\_enriched\_incremental.csv   # Enriched POI metadata (id, name, city, tags, coords, description…)
│   └── (raw data…)
├── Indexes/
│   └── poi\_ivfpq.index                       # IVF-PQ FAISS index built over LaBSE embeddings
├── experiments/
│   └── README.md                             # See detailed experimental setup, scripts & results
│   ├── measure\_index\_load.py
│   ├── measure\_search\_latency.py
│   ├── compare\_faiss\_params.py
│   └── …                                     # Other benchmarking & precision measurement scripts
└── README.md                                  # ← This file

````

---

## 📊 Dataset

- **Source**: OpenStreetMap POI dump, augmented with external descriptions (e.g. Wiki, travel guides).  
- **Enrichment**:  
  - We used the **Qwen** language model to generate and polish POI descriptions from raw metadata.  
- **File**: `Dataset/poi_dataset_enriched_incremental.csv`  
- **Schema** (columns):
  - `id` (string): unique POI identifier  
  - `name` (string)  
  - `city` (string, in Russian)  
  - `type` (OSM feature type)  
  - `lat`, `lon` (floats)  
  - `tags` (comma-separated `key:value` pairs)  
  - `enriched_description` (string, generated via Qwen)

---

## 🔄 Preprocessing & Tag Configuration

1. **Unique tag extraction**  
   - Scripts in `experiments/` extract and classify all unique OSM tags.
2. **Semantic grouping**  
   - Tags are grouped into high-level “interests” (e.g., `museums`, `cafes`, `parks`) via a lookup in `interest_tags.py`.
3. **Interest→tags mapping**  
   ```python
   # app/config/interest_tags.py (backend)
   interest_tags = {
     "museums":       ["tourism:museum", "historic:monument"],
     "cafes":         ["amenity:cafe", "amenity:coffee_shop"],
     "parks":         ["leisure:park"],
   }
---

## 🤖 Embedding Model

We use [sentence-transformers/LaBSE](https://huggingface.co/sentence-transformers/LaBSE) to encode free-text queries into 768-dim vectors:

```python
from sentence_transformers import SentenceTransformer
embedder = SentenceTransformer("sentence-transformers/LaBSE", device="cpu")
```

* **Normalization**: L2-normalize all embeddings before indexing/search.

---

## 🗂️ Index Building

We build an [IVF-PQ](https://github.com/facebookresearch/faiss/wiki/IVF-PQ) index:

* **NLIST** = 128
* **M** (number of subquantizers) = 32
* **nbits** (per subvector) = 8

Build command (example):

```bash
python build_faiss_index.py \
  --embeddings poi_embeddings.npy \
  --nlist 128 --m 32 --nbits 8 \
  --output Indexes/poi_ivfpq.index
```

*Load parameters* in code:

```python
index = faiss.read_index("Indexes/poi_ivfpq.index")
index.nprobe = 50  # probes per query for accuracy/speed trade-off
```

---

## 🔎 Search API Logic

### 1. `encode_query(q: str) → np.ndarray`

* Encodes & normalizes a single query.

### 2. `search_in_city(query, city=None, tags=None, top_n=10, expand_k=1000) → List[POI]`

1. **City mapping**: converts e.g. `"Moscow"` → `"Москва"`.
2. **Tag filtering**: if `tags` supplied, pre-filter POIs to those containing any of the specified tags.
3. **Vector search**:

   ```python
   D, I = index.search(qv, expand_k)  # returns top `expand_k` candidate indices
   ```
4. **Score & metadata**: map FAISS indices back to DataFrame rows, filter by city, return top `top_n`.

### 3. `recommend_by_interests(interests, additional_interests, city, top_n) → List[POI]`

* Iterates over each user interest → maps to tags + text query → calls `search_in_city` for each → merges & dedups results until `top_n` reached.

---

## ⚙️ Integration with Backend

* **Index file** (`DLS/Indexes/poi_ivfpq.index`) and **dataset CSV** (`Dataset/…csv`) must be mounted or copied into the backend container at runtime (`/usr/src/app/DLS/...`).
* The backend’s `POIService` imports directly from these locations to serve search & recommendation endpoints.

---

## 📈 Experiments & Metrics

See **detailed experimental setup, scripts, and results** in:

* **Experiments**: [experiments/README.md](experiments/README.md)

which includes:

* Index-load & search-latency measurement scripts
* Validation set & ground-truth annotation
* Precision\@K, latency, and memory footprint results
* Comparative analysis of FAISS parameters and embedding models
