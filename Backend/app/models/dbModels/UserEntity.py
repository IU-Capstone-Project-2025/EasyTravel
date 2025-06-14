from app.models.dbModels.Entity import EntityDB
from sqlalchemy import Column, String, UUID
from sqlalchemy.types import Enum as SqlEnum

from app.models.UserRole import UserRole


class UserEntity(EntityDB):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    hashed_password = Column(String(200), nullable=False)
    role = Column(SqlEnum(UserRole, name="user_role"), nullable=False, default=UserRole.BUYER)


    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "hashed_password": self.hashed_password,
            "role": self.role.value if isinstance(self.role, UserRole) else self.role,
        }

