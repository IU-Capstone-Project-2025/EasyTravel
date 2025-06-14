from uuid import uuid4

from app.models.dbModels.Entity import EntityDB
from app.infrastructure.core.config import settings
from app.infrastructure.db.session import async_engine, async_session_maker
from app.infrastructure.repositories.UserRepository import UserRepository
from app.models.dbModels.UserEntity import UserEntity
from app.models.UserRole import UserRole
from app.services.AuthorizationService import AuthService

async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(EntityDB.metadata.create_all)

    async with async_session_maker() as session:
        repo = UserRepository(session)
        owner = await repo.find_by_email(settings.OWNER_EMAIL)
        if not owner:
            hashed = AuthService().get_password_hash(settings.OWNER_PASSWORD)
            entity = UserEntity(
                id=uuid4(),
                first_name="Owner",
                last_name="User",
                email=settings.OWNER_EMAIL,
                hashed_password=hashed,
                role=UserRole.OWNER,
            )
            await repo.add_user(entity)
