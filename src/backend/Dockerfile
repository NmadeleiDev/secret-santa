FROM python:3.10.2

RUN python -m pip install --upgrade pip
RUN apt update && apt install -y uvicorn && apt -y install libpq-dev gcc && pip install fastapi[all] psycopg2-binary

COPY . /app
WORKDIR /app

CMD uvicorn main:app --port 2222 --host 0.0.0.0 --log-level debug

