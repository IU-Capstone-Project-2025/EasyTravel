# app/services/UserService.py
from uuid import uuid4

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.repositories.UserRepository import UserRepository
from app.models.dbModels.UserEntity import UserEntity
from app.models.dtoModels.UserDTO import UserCreateDTO, UserOutDTO
from app.services.AuthorizationService import AuthService

async def add_user(dto: UserCreateDTO, session: AsyncSession) -> UserOutDTO:
    repo = UserRepository(session)

    if await repo.find_by_email(str(dto.email)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with given email already exists",
        )

    hashed_pw = AuthService().get_password_hash(dto.password)

    entity = UserEntity(
        id=uuid4(),
        first_name=dto.first_name,
        last_name=dto.last_name,
        email=str(dto.email),
        hashed_password=hashed_pw,
        # ** new fields **
        city=dto.city,
        about_me=dto.about_me,
        interests=[i.value for i in dto.interests],
        additional_interests=dto.additional_interests,
    )

    saved = await repo.add_user(entity)
    # repo.add_user returns entity.to_dict(); pydantic will pick it up
    return UserOutDTO(**saved)
