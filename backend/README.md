# Survii Backend

A FastAPI-based backend for the Survii survey application with user authentication and survey management.

## Features

✅ **User Authentication**
- User registration with email & password
- Secure login with token-based authentication
- User profile management
- Logout with token invalidation

✅ **Database**
- SQLite database for data persistence
- SQLAlchemy ORM for database operations
- User, Survey, Question, Response, Answer, and Token models

✅ **API Documentation**
- Interactive Swagger UI at `/docs`
- ReDoc documentation at `/redoc`
- CORS enabled for frontend integration

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/niloofar-shahsavar/survey-app.git
cd survey-app/backend
```

### 2. Create a virtual environment (optional but recommended)
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

Required packages:
- fastapi
- uvicorn
- sqlalchemy
- pydantic
- python-dotenv
- google-genai (for AI features)

## Running the Server

### Development Mode
```bash
python -m uvicorn app.main:app --reload --port 8001
```

The server will start at `http://localhost:8001`

### Production Mode
```bash
python -m uvicorn app.main:app --port 8001
```

## API Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200
{
  "access_token": "token_string_here",
  "token_type": "bearer"
}
```

#### Get User Profile
```
GET /auth/profile
Authorization: Bearer {access_token}

Response: 200
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer {access_token}

Response: 200
{
  "message": "Successfully logged out"
}
```

## Database

### Location
```
backend/survey.db
```

### Tables
- **users** - User accounts
- **tokens** - Authentication tokens
- **surveys** - Survey definitions (user created)
- **questions** - Survey questions
- **responses** - Survey responses
- **answers** - Individual answers to questions

### Models
See `app/models.py` for complete database schema.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app setup and routes
│   ├── auth_routher.py      # Authentication endpoints
│   ├── ai_router.py         # AI-powered survey generation (disabled)
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── security.py          # Password hashing and token management
│   └── __pycache__/
├── survey.db                # SQLite database
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Configuration

### CORS
CORS is configured to allow requests from:
- `http://localhost:5173` (Frontend development)
- `http://localhost:3000`
- `http://localhost:5174`
- `http://localhost:8080`

Edit `app/main.py` to add more allowed origins.

### Environment Variables
Create a `.env` file in the `backend/` directory:
```
GEMINI_API_KEY=your_api_key_here  # For AI features
```

## API Documentation

### Interactive Docs (Swagger UI)
```
http://localhost:8001/docs
```

### Alternative Docs (ReDoc)
```
http://localhost:8001/redoc
```

## Authentication Flow

1. **Register**: User creates account with email & password
   - Password is hashed using SHA-256
   - Email must be unique
   
2. **Login**: User logs in with email & password
   - System verifies credentials
   - Access token generated and stored in database
   - Token returned to frontend
   
3. **Protected Requests**: Include token in header
   ```
   Authorization: Bearer {access_token}
   ```
   
4. **Logout**: Token is deleted from database
   - Makes token invalid for future requests

## Testing

### Test Registration & Login
```bash
# Register
curl -X POST "http://localhost:8001/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST "http://localhost:8001/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get Profile (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8001/auth/profile
```

## Troubleshooting

### Port Already in Use
```bash
python -m uvicorn app.main:app --port 8002  # Use different port
```

### Module Not Found
```bash
pip install -r requirements.txt
```

### Database Issues
Delete `survey.db` to create a fresh database:
```bash
rm backend/survey.db
```

## Future Enhancements

- [ ] Email verification
- [ ] Password reset
- [ ] User profile updates
- [ ] Survey CRUD operations
- [ ] Response analytics
- [ ] AI-powered question generation (Gemini API)
- [ ] JWT tokens instead of database tokens
- [ ] Role-based access control

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, create an issue in the GitHub repository.
