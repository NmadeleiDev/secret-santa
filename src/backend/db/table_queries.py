schema_create_query = """create schema if not exists santa"""

rooms_table_query = """
create table if not exists santa.room
(
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	name varchar default null,
	admin_user_id uuid REFERENCES santa.user (id),
	pairs jsonb default null
);
"""

users_table_query = """
create table if not exists santa.user
(
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	room_id varchar,
	name varchar default null,
	likes varchar[] default null,
	dislikes varchar[] default null
); 
"""