import logging
from fastapi import FastAPI, Response, status, UploadFile, File
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from db.manager import DbManager
from .utils import *
from .model import *
import random


def apply_handlers(app: FastAPI, db: DbManager):
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request, exc):
        return JSONResponse(error_response(str(exc)), status_code=422)

    @app.get("/test", status_code=200, response_model=DefaultResponseModel[dict], include_in_schema=False)
    def test_handler():
        return success_response({'result': 'ok'})

    # USER
    @app.get("/user/{user_id}/info", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[UserModel])
    def get_user_info(user_id: str, response: Response):
        """
        Данные пользователя
        """
        info, ok = db.get_user_info(user_id)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get user info')
        return success_response(info)

    @app.get("/user/{user_id}/recipient", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[UserModel])
    def get_user_recipient(user_id: str, response: Response):
        """
        Данные пользователя, которму данные пользователь дарит подарок
        """
        info, ok = db.get_user_info(user_id)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get user room')

        rid, ok = db.get_user_recipient(info['room_id'], user_id)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get user recipient id')
        
        rinfo, ok = db.get_user_info(rid)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get user recipient info')
        return success_response(rinfo)

    @app.post("/user", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[str])
    def create_user(body: UserModel, response: Response):
        """
        Создание пользователя, возвращает его id (код)
        """
        uid, ok = db.insert_user(name=body.name, room_id=body.room_id, likes=body.likes, dislikes=body.dislikes)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to save user info')
        return success_response(uid)


    # ROOM
    @app.get("/room/{room_id}/name", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[str])
    def get_room_name(room_id: str, response: Response):
        """
        Имя команты
        """
        name, ok = db.get_room_name(room_id)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get room info')
        return success_response(name)

    @app.get("/room/{room_id}/lock", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[str])
    def lock_name(room_id: str, response: Response):
        """
        Залочить комнату
        """
        ids, ok = db.get_user_ids_in_room(room_id=room_id)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get room users')

        pairs = {}

        if len(ids) == 1:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('can not lock room with one member')

        san = ids.pop(random.randrange(len(ids)))
        fsan = san

        while True:
            res = ids.pop(random.randrange(len(ids)))
            pairs[san] = res

            if len(ids) > 0:
                res = san
                san = ids.pop(random.randrange(len(ids)))
            else:
                pairs[res] = fsan
                break

        ok = db.lock_room(room_id, pairs)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to lock room')
        return success_response('OK')

    @app.post("/room", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[str])
    def create_room(body: RoomModel, response: Response):
        """
        Создание комнаты, возвращает ее id. Автоматически добавляет создателя в комнату.
        """
        rid, ok = db.insert_room(creator_id=body.admin_id, name=body.name)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to save room info')

        ok = db.update_user_room_id(body.admin_id, rid)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to save user room id')

        return success_response(rid)

    @app.get("/room/{room_id}/users", status_code=status.HTTP_200_OK, response_model=DefaultResponseModel[List[str]])
    def get_room_users(room_id: str, response: Response):
        """
        Получение имен участников данной команты (для админа команты) 
        """
        ids, ok = db.get_user_ids_in_room(room_id=room_id)
        if ok is False:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return error_response('failed to get room users')

        names = []
        for id in ids:
            info, ok = db.get_user_info(id)
            names.append(info['name'])
            if ok is False:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return error_response('failed to get user name')

        return success_response(names)
