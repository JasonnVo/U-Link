import express from 'express';
import db from './db.js';
import cors from 'cors'

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {
    db.all('SELECT id, username FROM users', [], (err, rows) => {
        if (err) {
            res.status(400).send(err.message);
        }
        res.send(rows);
    })
})

app.post('/users', (req, res) => {

    console.log("Received:", req.body);
    const { google_id, email, username } = req.body;

    if (!google_id || !email || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.get('SELECT * FROM users WHERE google_id = ? OR email = ?', [google_id, email], (err, row) => {
        if (err) res.status(500).send(err.message);
        if (row) {
            return res.status(200).json({message: 'User already exists',user: row});
        }
        const a = db.prepare(`INSERT INTO users (google_id, email, username) VALUES (?, ?, ?)`);
    
        a.run(google_id, email, username, function (err) {
            if(err) return res.status(400).json({ error: err.message });
            res.status(201).json({ message: 'User created successfully'}) 
        })
    });
});

app.listen(port, () => {
    console.log(`Server is running on port https://localhost:${port}`);
})