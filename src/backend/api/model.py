from typing import Dict, List, Optional, Tuple, Generic, TypeVar, Union
from pydantic.generics import GenericModel
from pydantic.main import BaseModel

DataT = TypeVar('DataT')

class DefaultResponseModel(GenericModel, Generic[DataT]):
    status: bool
    error: Optional[str] = None
    data: Optional[DataT]

class UserModel(BaseModel):
    room_id: str = ''
    name: str
    likes: str = ''
    dislikes: str = ''

class UserIdAndNameModel(BaseModel):
    name: str
    id: str = ''

class RoomModel(BaseModel):
    name: str
    admin_id: str
