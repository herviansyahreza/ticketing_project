const express = require('express')
const app = express()
const port = 3001
const db = require('./db.config/db.config')

const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/router')

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors())

app.use('/', userRouter)

db.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
});

app.get('/', async (req, res) => {
    try {
        res.send(`Welcome Page`);
    } catch (error) {
        console.log(error);;
    }
});

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})

//Test untuk koneksi db
app.get('/checkdb', async (req, res) => {
    try {
        await db.query('SELECT NOW()');
        res.status(200).json({ message: 'Database connected successfully' });
    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ message: 'Failed to connect to database' });
    }
});
