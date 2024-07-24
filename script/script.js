const { Pool } = require('pg');

const createUserTable = async (db) => {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.query(`CREATE TABLE IF NOT EXISTS users(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
)`);
};

const createHotelTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS hotels(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    facilities TEXT[] NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
    )`);
};

const createRoomTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS rooms(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "hotelId" UUID,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    "roomPrice" INT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY ("hotelId") REFERENCES hotels(id) ON DELETE CASCADE
    )`);
};

const createBookingTable = async (db) => {
  await db.query(`CREATE TABLE IF NOT EXISTS bookings(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userName" VARCHAR(255) NOT NULL,
    "userId" UUID NOT NULL,
    "hotelOwnerId" UUID NOT NULL,
    "hotelId" UUID NOT NULL,
    "roomId" UUID NOT NULL,
    "startDate" TIMESTAMPTZ,
    "endDate" TIMESTAMPTZ,
    "breakFastIncluded" BOOLEAN NOT NULL,
    currency VARCHAR(50) NOT NULL,
    "paymentStatus" VARCHAR(100) NOT NULL,
    "paymentIntentId" VARCHAR(255) NOT NULL UNIQUE,
    "totalPrice" INT NOT NULL,
    "bookedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY ("hotelId") REFERENCES hotels(id) ON DELETE CASCADE,
    FOREIGN KEY ("roomId") REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
    )`);
};

const main = async () => {
  const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
  });

  const db = await pool.connect();

  await createUserTable(db);
  await createHotelTable(db);
  await createRoomTable(db);
  await createBookingTable(db);

  db.release();
};

main()
  .then(() => console.log('Tables created successfully 🎉'))
  .catch((error) => console.log(error));
