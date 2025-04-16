require('dotenv').config();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

// Connect to MongoDB
async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: Date
  });

  return mongoose.model('User', userSchema);
}

// Connect to MySQL and fetch users
async function fetchUsersFromMySQL() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

  console.log("Connected to MySQL");
  const [rows] = await connection.execute("SELECT name, email, created_at FROM users");
  await connection.end();
  return rows;
}

// Main migration logic
(async () => {
  try {
    const UserModel = await connectMongo();
    const users = await fetchUsersFromMySQL();

    // Transform MySQL rows if needed
    const docs = users.map(user => ({
      name: user.name,
      email: user.email,
      createdAt: user.created_at
    }));

    // Insert into MongoDB
    await UserModel.insertMany(docs);
    console.log(`Migrated ${docs.length} users successfully.`);

    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
})();
