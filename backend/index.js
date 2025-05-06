import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// post endpoint
app.post('/vehicles', async (req, res) => {
  const buses = req.body;
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
  try {
    for (const bus of buses) {
      await pool.query(query, [
        bus.id,
        bus.attributes.latitude,
        bus.attributes.longitude,
        bus.attributes.label,
        bus.relationships?.route?.data?.id ?? null,
      ]);
    }
    res.status(200).send('Buses saved to DB.');
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
