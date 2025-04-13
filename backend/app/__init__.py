from flask import Flask
from flask_cors import CORS
import psycopg2
import os
from sqlalchemy import create_engine
from datetime import timedelta
from dotenv import load_dotenv  # Import load_dotenv to load environment variables

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)

# Generate a new secret key on each app restart
app.config["SECRET_KEY"] = os.urandom(24)

CORS(app, supports_credentials=True)

app.config["SESSION_TYPE"] = "filesystem"  # Can be any session type you prefer
app.config["SESSION_COOKIE_SECURE"] = True  # Ensure secure session cookie for production
app.config["SESSION_COOKIE_SAMESITE"] = "None"  # Apply strict same-site policy

# Build the database connection string using environment variables
##DB_CONNECTION_STRING = (
  ##  f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}"
    ##f"@{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
##)
DB_CONNECTION_STRING="postgresql://postgres:money*819@localhost:5432/cuma"


# Establish DB connection using psycopg2 and SQLAlchemy
conn = psycopg2.connect(DB_CONNECTION_STRING)
engine = create_engine(DB_CONNECTION_STRING)

@app.route("/")
def testmain():
    return "testing"

# Include routes at the end
from app import routes
