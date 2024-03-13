from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import ProgrammingError

SQLALCHEMY_DATABASE_URL = "postgresql://Qasim-hub:19UPGOuisfqy@ep-hidden-haze-06137072.us-east-2.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(SQLALCHEMY_DATABASE_URL , pool_pre_ping=True)

with engine.connect() as conn:
    trans = conn.begin()
    try:
        conn.execute(text("CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(255), description VARCHAR(255))"))
        trans.commit()
        # print("Table created successfully")
        
    except ProgrammingError as e:
        trans.rollback()
        if "already exists" in str(e):
            print("Table already exists")
        else:
            print(f"An error occurred: {e}")
        raise




# with engine.connect() as conn:
#     trans = conn.begin()
#     try:
#         conn.execute(
#             text("INSERT INTO todos (title, description) VALUES (:title, :description)"),
#             [{"title": "Task 1", "description": "Do something on task 1"}, 
#             ])
#         trans.commit()
#     except:
#         trans.rollback()
#         raise
    





SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)



