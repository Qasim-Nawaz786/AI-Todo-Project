# test_api.py

from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_create_todo():
    response = client.post("/todos/", json={"title": "Test Todo", "description": "Test Description"})
    assert response.status_code == 200
    assert response.json()["title"] == "Test Todo"

def test_update_todo():
    response = client.put("/todos/19", json={"title": "Updated Todo", "description": "Updated Description"})
    print(response.json())
    assert response.status_code == 200
    print(response.status_code)
    assert response


def test_delete_todo():
    response = client.delete("/todos/16")
    assert response.status_code == 200
    assert response.json()["message"] == "Todo deleted"