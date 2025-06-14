from fastapi import FastAPI, APIRouter, Request, HTTPException
from fastapi.exceptions import RequestValidationError
import uvicorn


from app.infrastructure.logger import logger
from app.infrastructure.exception_handler import global_exception_handler
from app.infrastructure.init_db import init_db
from app.api.main import api_router


# Настройка роутеров
main_router = APIRouter()
main_router.include_router(api_router)

app = FastAPI()
app.include_router(main_router, prefix="/api")
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(HTTPException, global_exception_handler)
app.add_exception_handler(RequestValidationError, global_exception_handler)


# Мидлвар для логирования HTTP-запросов
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("Request: %s %s", request.method, request.url)
    response = await call_next(request)
    logger.info("Response status: %s", response.status_code)
    return response


# Событие старта приложения
@app.on_event("startup")
async def on_startup():
    await init_db()


# Запуск приложения
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
