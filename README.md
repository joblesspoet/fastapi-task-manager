# FastAPI Task Manager with AI-Powered Classification

This is a simple Task Manager API built with FastAPI and SQLAlchemy, featuring AI-powered task classification using Hugging Face's Transformers.

## Features

- **Task Creation**: Add new tasks with automatic AI-based classification for priority and category.
- **Task Listing**: Retrieve all tasks in descending order.
- **CORS Enabled**: Allows frontend integration with `http://localhost:3000`.

## Technologies Used

- **FastAPI** - For building the REST API.
- **SQLAlchemy** - ORM for database interaction.
- **Pydantic** - Data validation and serialization.
- **Hugging Face Transformers** - AI-based text classification.
- **CORS Middleware** - Enables cross-origin requests.

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/joblesspoet/fastapi-task-manager.git
cd fastapi-task-manager
```

## Create and Activate a Virtual Environment

```sh
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
```

## Install Dependencies

```sh
pip install -r requirements.txt
```

## Run the FastAPI Server

```sh
uvicorn main:app --reload
```

The API will be available at: http://127.0.0.1:8000

## API Endpoints

### 1. Create a New Task

Endpoint: POST /tasks/
Request Body:

```sh
[
  {
    "description": "Complete project documentation",
  }
]
```

## Get All Tasks

Endpoint: GET /tasks/
Response Example:

```sh
[
  {
    "id": 1,
    "description": "Complete project documentation",
    "priority": "high",
    "category": "work"
  }
]
```

## License

This project is licensed under the MIT License.
