from uuid import UUID

from pydantic import EmailStr, Field
from app.models.dtoModels.EntityDTO import Entity as DTO
from app.models.UserRole import UserRole

class UserCreateDTO(DTO):
    first_name: str = Field(..., max_length=50)
    last_name:  str = Field(..., max_length=50)
    email:      EmailStr
    password:   str  = Field(..., min_length=6)


class UserOutDTO(DTO):
    id:         UUID
    first_name: str
    last_name:  str
    email:      EmailStr
    role:       UserRole

