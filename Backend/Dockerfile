FROM python:3.11-slim AS deps

WORKDIR /usr/src/app
COPY requirements.txt .
RUN pip install -r requirements.txt


FROM python:3.11-slim

WORKDIR /usr/src/app

COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

COPY . .

ENV PYTHONUNBUFFERED=1 \
    APP_MODULE="app.main:app" \
    UVI_WORKERS=4 \
    UVI_HOST=0.0.0.0 \
    UVI_PORT=8000

EXPOSE 8000

CMD ["uvicorn", "--workers", "4", "--host", "0.0.0.0", "--port", "8000", "app.main:app"]
