# 10b: MongoDB → PostgreSQL Migration Script

This project demonstrates how to migrate data from a MongoDB database to a PostgreSQL database using a Python script and Docker containers for both databases.

---

## How It Works

- MongoDB is used as the **source database**.
- PostgreSQL is used as the **target database**.
- A sample MongoDB collection (`users`) is pre-populated with data.
- The Python script connects to both databases, reads data from MongoDB, and inserts it into a PostgreSQL table.

---

## What Is Included

- `docker-compose.yml` – Spins up MongoDB and PostgreSQL.
- `init-mongo.js` – Seeds MongoDB with sample data on startup.
- `migrate.py` – Migration script to move data from MongoDB to PostgreSQL.

---

## How to Test

### 1. Clone the Project (or set it up manually)

```bash
git clone https://github.com/your-username/mongo-postgres-migration.git
cd mongo-postgres-migration
```

---

### 2. Start the Databases

Make sure Docker is installed and running, then start the containers:

```bash
docker-compose up -d
```

---

### 3. Install Python Dependencies

Make sure Python is installed, then install the required packages:

```bash
pip install pymongo psycopg2
```

---

### 4. Run the Migration Script

```bash
python migrate.py
```

You should see:

```
Data migration completed.
```

---

### 5. Verify the Data in PostgreSQL

You can verify that the data was migrated successfully using the PostgreSQL CLI.

#### A. Open a shell inside the PostgreSQL container:

```bash
docker exec -it postgres_db psql -U postgres -d target_db
```

#### B. Inside the PostgreSQL shell, run:

```sql
SELECT * FROM users;
```

You should see output like:

```
 id |  name   |       email        | age 
----+---------+--------------------+-----
  1 | Alice   | alice@example.com  |  30
  2 | Bob     | bob@example.com    |  25
  3 | Charlie | charlie@example.com|  35
```

To exit the shell, type:

```
\q
```

---

## Default Credentials

### PostgreSQL

- Username: `postgres`
- Password: `postgres`
- Database: `target_db`

### MongoDB

- Runs without authentication (for demo/testing only)
- Database: `source_db`
- Collection: `users`
