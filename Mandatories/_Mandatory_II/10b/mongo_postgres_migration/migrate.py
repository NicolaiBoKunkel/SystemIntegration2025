from pymongo import MongoClient
import psycopg2

# MongoDB connection
mongo_client = MongoClient("mongodb://localhost:27017/")
mongo_db = mongo_client["source_db"]
users_collection = mongo_db["users"]

# PostgreSQL connection
pg_conn = psycopg2.connect(
    dbname="target_db",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)
pg_cursor = pg_conn.cursor()

# Create table if not exists
pg_cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    age INT
)
""")

# Migrate data
for user in users_collection.find():
    name = user.get("name")
    email = user.get("email")
    age = user.get("age")

    pg_cursor.execute(
        "INSERT INTO users (name, email, age) VALUES (%s, %s, %s)",
        (name, email, age)
    )

pg_conn.commit()
print("Data migration completed.")

# Close connections
pg_cursor.close()
pg_conn.close()
mongo_client.close()
