from fastapi import APIRouter

from app.api.routes import UserRout, ProductRout
from app.api.routes import TokenRout

api_router = APIRouter()

api_router.include_router(UserRout.router, prefix="/user", tags=["user"])
api_router.include_router(TokenRout.router, prefix="/token", tags=["token"])
api_router.include_router(ProductRout.router, prefix="/product", tags=["product"])
