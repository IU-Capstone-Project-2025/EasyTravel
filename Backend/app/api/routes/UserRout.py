from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.db.session import fastapi_get_db
from app.models.dtoModels.POIOutDTO import POIOutDTO
from app.models.dtoModels.UserDTO import UserCreateDTO, UserOutDTO
from app.services.AuthorizationService import get_current_user_service
from app.services.POIService import POIService
from app.services.UserService import add_user, update_interests, update_city, update_additional_interests, \
    update_about_me

router = APIRouter()


@router.post("/register", response_model=UserOutDTO, status_code=status.HTTP_201_CREATED)
async def register(
    dto: UserCreateDTO,
    session: AsyncSession = Depends(fastapi_get_db),
):
    return await add_user(dto, session)


@router.put("/update_interests")
async def update_interests_endpoint(
    interests: list[str],
    session: AsyncSession = Depends(fastapi_get_db),
    current_user: UserOutDTO = Depends(get_current_user_service),
):
    await update_interests(current_user.id, interests, session)

@router.put("/update_city")
async def update_city_endpoint(
        city: str,
        session: AsyncSession = Depends(fastapi_get_db),
        current_user: UserOutDTO = Depends(get_current_user_service),
):
    await update_city(current_user.id, city, session)

@router.put("update_additional_interests")
async def update_additional_interests_endpoint(
        interests: str,
        session: AsyncSession = Depends(fastapi_get_db),
        current_user: UserOutDTO = Depends(get_current_user_service),
):
    await update_additional_interests(current_user.id, interests, session)


@router.put("update_about_me")
async def update_about_me_endpoint(
        about_me: str,
        session: AsyncSession = Depends(fastapi_get_db),
        current_user: UserOutDTO = Depends(get_current_user_service),
):
    await update_about_me(current_user.id, about_me, session)