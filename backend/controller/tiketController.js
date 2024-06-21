const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_tiket = async (req, res, next) => {
    const { judul, deskripsi, user, status, prioritas } = req.body;

    try {
        // Ambil ID user, status, dan prioritas dari database berdasarkan nama yang diberikan
        const userIdQuery = await db.query('SELECT id FROM users WHERE username = $1', [user]);
        const userId = userIdQuery.rows[0]?.id;
        if (!userId) {
            return res.status(400).send('Invalid user');
        }

        const statusIdQuery = await db.query('SELECT id FROM status WHERE nama = $1', [status]);
        const statusId = statusIdQuery.rows[0]?.id;
        if (!statusId) {
            return res.status(400).send('Invalid status');
        }

        const prioritasIdQuery = await db.query('SELECT id FROM prioritas WHERE nama = $1', [prioritas]);
        const prioritasId = prioritasIdQuery.rows[0]?.id;
        if (!prioritasId) {
            return res.status(400).send('Invalid prioritas');
        }

        // Insert data tiket jaringan ke database
        const currentDate = new Date().toISOString();
        const newTicket = await db.query(
            'INSERT INTO tiket (judul, deskripsi, user_id, status, prioritas, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [judul, deskripsi, userId, statusId, prioritasId, currentDate]
        );

        res.status(201).json(newTicket.rows[0]);
    } catch (error) {
        console.error('Error adding network ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const show_tiket = async (req, res, next) => {
    try {
        // Query untuk mengambil data tiket dan nama pengguna
        const query = `
        SELECT tiket.*, 
                users.username AS users_username, 
                status.nama AS status_nama, 
                prioritas.nama AS prioritas_nama
        FROM tiket
                JOIN users ON tiket.user_id = users.id
                JOIN status ON tiket.status = status.id
                JOIN prioritas ON tiket.prioritas = prioritas.id
        `;
        const tikets = await db.query(query);

        res.status(200).json(tikets.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const get_tiket = async (req, res, next) => {
    const id_tiket = req.params.id;
    try {
        const tiket = await db.query('SELECT * FROM tiket WHERE id = $1', [id_tiket]);
        if (tiket.rowCount > 0) {
            res.status(200).json(tiket.rows[0]);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_tiket = async(req, res, next) => {
    const { id, judul, deskripsi,status, prioritas } = req.body;
    console.log(id)

    try {
        // Ambil ID user, status, dan prioritas dari database berdasarkan nama yang diberikan
        // const userIdQuery = await db.query('SELECT id FROM users WHERE username = $1', [user]);
        // const userId = userIdQuery.rows[0]?.id;
        // if (!userId) {
        //     return res.status(400).send('Invalid user');
        // }

        const statusIdQuery = await db.query('SELECT id FROM status WHERE nama = $1', [status]);
        const statusId = statusIdQuery.rows[0]?.id;
        if (!statusId) {
            return res.status(400).send('Invalid status');
        }

        const prioritasIdQuery = await db.query('SELECT id FROM prioritas WHERE nama = $1', [prioritas]);
        const prioritasId = prioritasIdQuery.rows[0]?.id;
        if (!prioritasId) {
            return res.status(400).send('Invalid prioritas');
        }
    
        const currentDate = new Date().toISOString();
        const updateTicket = await db.query('UPDATE tiket SET judul = $1, deskripsi = $2, status = $3, prioritas = $4, edited_at = $5 WHERE id = $6 RETURNING *'
        , [judul, deskripsi, statusId, prioritasId, currentDate, id]);

        if (updateTicket.rowCount > 0) {
            res.status(200).json({ message: 'Ticket updated successfully' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove_tiket = async(req, res, next) => {
    const id_tiket = req.params.id;
    try {
        const result = await db.query('DELETE FROM tiket WHERE id = $1', [id_tiket]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Ticket deleted successfully' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        } 
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const get_username = async (req, res, next) => {
    const userIds = req.body;

    try {
        // Query SQL untuk mendapatkan usernames berdasarkan user_id
        const result = await db.query('SELECT id, username FROM users WHERE id = ANY($1)', [userIds]);
        const username = {};
        result.rows.forEach(row => {
            username[row.id] = row.username;
        });
        res.json(username);
    } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    add_tiket,
    show_tiket,
    get_tiket,
    get_username, 
    edit_tiket,
    remove_tiket,
}