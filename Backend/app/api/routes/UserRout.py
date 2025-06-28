from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.db.session import fastapi_get_db
from app.models.dtoModels.POIOutDTO import POIOutDTO
from app.models.dtoModels.UserDTO import UserCreateDTO, UserOutDTO
from app.services.AuthorizationService import get_current_user_service
from app.services.POIService import POIService
from app.services.UserService import add_user

router = APIRouter()


@router.post("/register", response_model=UserOutDTO, status_code=status.HTTP_201_CREATED)
async def register(
    dto: UserCreateDTO,
    session: AsyncSession = Depends(fastapi_get_db),
):
    return await add_user(dto, session)
