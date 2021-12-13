from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from db.manager import DbManager
from api.handlers import apply_handlers


logging.basicConfig(format='%(asctime)s %(message)s',
                    datefmt='%m/%d/%Y %H:%M:%S :', level=logging.DEBUG)

db = DbManager()
db.create_tables()

app = FastAPI(
    title="Secret Santa API",
    description='API docs for secret Santa backend',
    version="1.0.0",
    contact={
        "name": "Gregory Potemkin",
        "email": "potemkin3940@gmail.com",
    },
    docs_url="/docs",
    root_path="/api/v1",
    openapi_url="/api/v1/openapi.json"
)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://front:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

apply_handlers(app, db)
