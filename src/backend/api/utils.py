from typing import Union

from api.model import DefaultResponseModel

def success_response(msg: dict = {}) -> DefaultResponseModel:
    resp = DefaultResponseModel(data=msg, status=True)
    return resp

def error_response(msg: Union[str, None] = None) -> dict:
    resp = {'error': msg, 'status': False}
    return resp


