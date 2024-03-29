import os
import logging
import random
from typing import List, Tuple
import psycopg2
from psycopg2 import extras
from psycopg2.extras import DictCursor
from db.table_queries import *
import json


class DbManager():
    def __init__(self) -> None:
        self.db_name = os.getenv('POSTGRES_DB')
        self.host = os.getenv('POSTGRES_HOST')
        self.port = int(os.getenv('POSTGRES_PORT', '5432'))
        self.user = os.getenv('POSTGRES_USER')
        self.password = os.getenv('POSTGRES_PASSWORD')

        self.conn = psycopg2.connect(
            database=self.db_name, user=self.user, password=self.password, host=self.host, port=self.port)

        self.conn.autocommit = True
        logging.info("Connected to db")

    def cursor_wrapper(f):
        def db_fn(self, *args, **kwargs):
            cursor = self.conn.cursor()
            res = f(self, *args, **kwargs, cursor=cursor)
            cursor.close()
            return res
        return db_fn

    def dict_cursor_wrapper(f):
        def db_fn(self, *args, **kwargs):
            cursor = self.conn.cursor(cursor_factory=DictCursor)
            res = f(self, *args, **kwargs, cursor=cursor)
            cursor.close()
            return res
        return db_fn

    @cursor_wrapper
    def create_tables(self, cursor=None):
        cursor.execute(schema_create_query)
        cursor.execute(users_table_query)
        cursor.execute(rooms_table_query)


    #CRUD user
    @cursor_wrapper
    def insert_user(self, name: str, room_id: str, likes: str, dislikes: str, cursor=None) -> Tuple[str, bool]:

        query = """INSERT INTO santa.user (name, room_id, likes, dislikes) VALUES (%s,%s,%s,%s) RETURNING id"""

        try:
            cursor.execute(query, (name, room_id, likes, dislikes))
            id = cursor.fetchall()[0][0]
            return id, True
        except Exception as e:
            logging.error("Failed to insert user: {}".format(e))
            return '', False

    @dict_cursor_wrapper
    def get_user_info(self, user_id: str, cursor=None) -> Tuple[dict, bool]:
        query = """SELECT id, room_id, name, likes, dislikes FROM santa.user WHERE id=%s"""

        try:
            cursor.execute(query, (user_id, ))

            res = dict(cursor.fetchall()[0])
            return res, True
        except Exception as e:
            logging.error("Failed to get user info: {}".format(e))
            return {}, False

    @cursor_wrapper
    def update_user_likes(self, user_id: str, likes: str, dislikes: str, cursor=None) -> bool:
        query = """UPDATE santa.user 
                SET (likes, dislikes) = (%s,%s)
                WHERE id=%s"""

        try:
            cursor.execute(query, (likes, dislikes, user_id))
            return True
        except Exception as e:
            logging.error("Failed to update user likes: {}".format(e))
            return False

    @cursor_wrapper
    def update_user_name(self, user_id: str, name: str, cursor=None) -> bool:
        query = """UPDATE santa.user 
                SET name = %s
                WHERE id=%s"""

        try:
            cursor.execute(query, (name, user_id))
            return True
        except Exception as e:
            logging.error("Failed to update user name: {}".format(e))
            return False

    @cursor_wrapper
    def update_user_room_id(self, user_id: str, room_id: str, cursor=None) -> bool:
        query = """UPDATE santa.user 
                SET room_id=%s
                WHERE id=%s AND (room_id='' OR room_id=%s)"""

        try:
            cursor.execute(query, (room_id, user_id, room_id))
            return True if cursor.rowcount == 1 else False
        except Exception as e:
            logging.error("Failed to update user room: {}".format(e))
            return False

    @dict_cursor_wrapper
    def get_users_in_room(self, room_id: str, cursor=None) -> Tuple[List[dict], bool]:
        query = """SELECT name, id FROM santa.user WHERE room_id=%s"""

        try:
            cursor.execute(query, (room_id, ))
            res = cursor.fetchall()
            return [dict(x) for x in res], True
        except Exception as e:
            logging.error("Failed to get room users: {}".format(e))
            return [], False

    @cursor_wrapper
    def get_user_ids_in_room(self, room_id: str, cursor=None) -> Tuple[List[str], bool]:
        query = """SELECT id FROM santa.user WHERE room_id=%s"""

        try:
            cursor.execute(query, (room_id, ))
            res = cursor.fetchall()
            return [x[0] for x in res], True
        except Exception as e:
            logging.error("Failed to get room user ids: {}".format(e))
            return [], False

    @cursor_wrapper
    def delete_user_from_room(self, user_id: str, room_id: str, cursor=None) -> bool:
        query = """UPDATE santa.user SET room_id = '' WHERE id=%s AND room_id=%s"""

        try:
            cursor.execute(query, (user_id, room_id, ))
            return True
        except Exception as e:
            logging.error("Failed to update room: {}".format(e))
            return [], False

    @cursor_wrapper
    def check_if_room_member(self, room_id: str, user_id: str, cursor=None) -> Tuple[bool, bool]:
        query = """SELECT room_id=%s FROM santa.user WHERE id=%s"""

        try:
            cursor.execute(query, (room_id, user_id))
            res = cursor.fetchall()[0][0]
            return res, True
        except Exception as e:
            logging.error("Failed to check room admin: {}".format(e))
            return False, False
    

    # CRUD room
    @cursor_wrapper
    def insert_room(self, creator_id: str, name: str, cursor=None) -> Tuple[str, bool]:
        query = """INSERT INTO santa.room (name, admin_user_id) VALUES (%s,%s) RETURNING id"""

        try:
            cursor.execute(query, (name, creator_id))
            id = cursor.fetchall()[0][0]
            return id, True
        except Exception as e:
            logging.error("Failed to insert room: {}".format(e))
            return 0, False

    @cursor_wrapper
    def get_room_name(self, room_id: str, cursor=None) -> Tuple[str, bool]:
        query = """SELECT name FROM santa.room WHERE id=%s"""

        try:
            cursor.execute(query, (room_id, ))
            name = cursor.fetchall()[0][0]
            return name, True
        except Exception as e:
            logging.error("Failed to get room name: {}".format(e))
            return '', False

    @cursor_wrapper
    def check_if_room_admin(self, room_id: str, user_id: str, cursor=None) -> Tuple[bool, bool]:
        query = """SELECT admin_user_id::varchar=%s FROM santa.room WHERE id=%s"""

        try:
            cursor.execute(query, (user_id, room_id))
            res = cursor.fetchall()[0][0]
            return res, True
        except Exception as e:
            logging.error("Failed to check room admin: {}".format(e))
            return False, False

    @cursor_wrapper
    def get_room_id_by_admin_id(self, user_id: str, cursor=None) -> Tuple[str, bool]:
        query = """SELECT id FROM santa.room WHERE admin_user_id=%s"""

        try:
            cursor.execute(query, (user_id,))
            res = cursor.fetchall()[0][0]
            return res, True
        except Exception as e:
            logging.error("Failed to get room id by admin: {}".format(e))
            return False, False

    @cursor_wrapper
    def lock_room(self, id: str, pairs: dict, cursor=None) -> bool:
        query = """UPDATE santa.room SET pairs=%s WHERE id=%s"""

        try:
            cursor.execute(query, (json.dumps(pairs), id))
            return True
        except Exception as e:
            logging.error("Failed to lock room: {}".format(e))
            return False

    @cursor_wrapper
    def get_user_recipient(self, room_id: str, user_id: str, cursor=None) -> Tuple[str, bool]:
        query = """SELECT pairs::json->%s FROM santa.room WHERE id=%s"""

        try:
            cursor.execute(query, (user_id, room_id))
            res = cursor.fetchall()[0][0]
            return res, True
        except Exception as e:
            logging.error("Failed to get_user_recipient: {}".format(e))
            return [], False
