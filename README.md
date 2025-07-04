# EasyTravel: POI Search & Recommendation System

EasyTravel is an intelligent web application for fast semantic search and personalized recommendations of points of interest (POIs) and attractions based on user interests and free-text queries.

## 📌 Value Proposition

EasyTravel helps users discover places and experiences tailored to their preferences by combining semantic vector search with personalized interest tags.

---

## 📚 Project Architecture

The repository is organized into three main components:

```
EasyTravel
├── Backend            # FastAPI REST API, authentication, database models
│   ├── app
│   ├── Dockerfile
│   └── requirements.txt
├── Frontend           # React application (separate README)
│   └── src
├── DLS                # Data & Search Engine
│   ├── Dataset        # Raw & enriched POI data
│   ├── Indexes        # FAISS indexes (IVF-PQ)
│   ├── experiments    # Experiment scripts & results
|   └── Embeddings     # Embeddings
└── docker-compose.yml
```

* **Backend**: implements authentication, user/profile management, search and recommendation endpoints.
* **Frontend**: user interface (handled by a separate team).
* **DLS**: handles data preprocessing, embedding generation (LaBSE), FAISS index building and search.

---

## 🛠️ Technology Stack

* **Backend**: FastAPI, PostgreSQL, SQLAlchemy, Pydantic, OAuth2/JWT, Docker
* **Search Engine**: FAISS (IVF-PQ), LaBSE sentence embeddings (Sentence-Transformers)
* **Data Processing**: Python, Pandas, NumPy
* **Containerization**: Docker, docker-compose

---

## 🚀 Getting Started

1. **Launch with Docker Compose**

   ```bash
   docker-compose up --build
   ```

   This will start the FastAPI backend on port **8000** and a PostgreSQL database.

---

## 📈 Experiments & Metrics

All search & recommendation experiments, benchmarking scripts, and results are under `DLS/experiments`. Key insights:

* **Embedding model**: LaBSE (768-dim)
* **FAISS parameters**: `NLIST=128`, `nprobe=50`, `expand_k=1000`
* **Best precision**: precision\@5 = **0.837**, precision\@10 = **0.759**

---

## 🔗 Documentation

* **Backend API**: [Backend/README.md](Backend/README.md)
* **Search Engine & Data**: [DLS/README.md](DLS/README.md)
* **Frontend**: (to be provided separately)

---

## 🎯 Next Steps

* Enhance personalization using search history and collaborative filtering.
* Scale to more cities and POI categories.
* Optimize indexing (quantization, HNSW, etc.) for faster latency.

---

**EasyTravel** makes finding the right place quick, accurate, and tailored to you!
