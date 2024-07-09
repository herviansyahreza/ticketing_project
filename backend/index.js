const express = require('express');
const app = express();
const port = 3001;
const db = require('./db.config/db.config');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/router');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Hapus opsi maxAge di sini

// Konfigurasi CORS
app.use(cors({
    origin: 'http://localhost:3000', // Atur origin sesuai dengan domain frontend Anda
    credentials: true,
}));

// Route
app.use('/', userRouter);

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
});

// Halaman selamat datang
app.get('/', async (req, res) => {
    try {
        res.send(`Welcome Page`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint untuk tes koneksi database
app.get('/checkdb', async (req, res) => {
    try {
        await db.query('SELECT NOW()');
        res.status(200).json({ message: 'Database connected successfully' });
    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ message: 'Failed to connect to database' });
    }
});

// Server listen
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
