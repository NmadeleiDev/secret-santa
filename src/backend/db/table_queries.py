schema_create_query = """create schema if not exists santa"""

rooms_table_query = """
create table if not exists santa.room
(
	id serial
		constraint room_pk
			primary key,
	name varchar default null,
	admin_user_id integer REFERENCES santa.user (id),
	pairs jsonb default null
);
"""

users_table_query = """
create table if not exists santa.user
(
	id serial
		constraint user_pk
			primary key,
	room_id integer,
	name varchar default null,
	likes varchar[] default null,
	dislikes varchar[] default null
);
"""