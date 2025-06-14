from uuid import UUID

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.db.session import fastapi_get_db
from app.models.dtoModels.UserDTO import UserCreateDTO, UserOutDTO
from app.models.UserRole import UserRole
from app.services.UserService import add_user, change_role
from app.services.AuthorizationService import get_current_user_service

router = APIRouter()


@router.post("/register", response_model=UserOutDTO, status_code=status.HTTP_201_CREATED)
async def register(
    dto: UserCreateDTO,
    session: AsyncSession = Depends(fastapi_get_db),
):
    return await add_user(dto, session)


@router.post("/{user_id}/role", response_model=UserOutDTO)
async def set_role(
    user_id: UUID,
    role: UserRole,
    current_user: UserOutDTO = Depends(get_current_user_service),
    session: AsyncSession = Depends(fastapi_get_db),
):
    if current_user.role != UserRole.OWNER:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    return await change_role(user_id, role, session)
