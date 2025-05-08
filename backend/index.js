import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// create a relational database table if it doesnt already exist
await pool.query(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    label TEXT,
    route_id TEXT,
    updated_at TIMESTAMP
  )
`);

// post endpoint, fetches data from mbta api and stores it inside postgres database 
app.post('/update-vehicles', async (req, res) => {
  try {
    // fetch data from mbta api with API key from the env file 
    const mbtaResponse = await fetch(`https://api-v3.mbta.com/vehicles?filter[route_type]=3&api_key=${process.env.MBTA_API_KEY}`);
    const data = await mbtaResponse.json();
    console.log('MBTA API full response:', JSON.stringify(data, null, 2)); // log API response to make sure it updates

    // SQL query to insert data into postgres database
    const query = `
      INSERT INTO vehicles (id, latitude, longitude, label, route_id, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      ON CONFLICT (id)
      DO UPDATE SET 
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        label = EXCLUDED.label,
        route_id = EXCLUDED.route_id,
        updated_at = NOW();
    `;

    for (const bus of data.data) {
      await pool.query(query, [
        bus.id,
        bus.attributes.latitude,
        bus.attributes.longitude,
        bus.attributes.label,
        bus.relationships?.route?.data?.id ?? null,
      ]);
    }

    res.status(200).send('Buses fetched from MBTA and saved to database');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// get endpoint 
app.get('/vehicles', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));
