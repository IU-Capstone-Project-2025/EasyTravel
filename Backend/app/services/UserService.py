from uuid import uuid4, UUID

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.repositories.UserRepository import UserRepository
from app.models.dbModels.UserEntity import UserEntity
from app.models.dtoModels.UserDTO import UserCreateDTO, UserOutDTO
from app.models.UserRole import UserRole
from app.services.AuthorizationService import AuthService


async def add_user(dto: UserCreateDTO, session: AsyncSession) -> UserOutDTO:

    repo = UserRepository(session)

    if await repo.find_by_email(str(dto.email)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with given email already exists",
        )

    auth = AuthService()
    hashed_pw = auth.get_password_hash(dto.password)

    entity = UserEntity(
        id=uuid4(),
        first_name=dto.first_name,
        last_name=dto.last_name,
        email=str(dto.email),
        hashed_password=hashed_pw,
        role=UserRole.BUYER,
    )

    saved = await repo.add_user(entity)

    return UserOutDTO(**saved)


async def change_role(user_id: UUID, role: UserRole, session: AsyncSession) -> UserOutDTO:
    repo = UserRepository(session)
    updated = await repo.set_role(user_id, role)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return UserOutDTO(**updated)
