from enum import Enum

class UserRole(str, Enum):
    BUYER = "buyer"
    SELLER = "seller"
    OWNER = "owner"
