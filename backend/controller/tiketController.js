const express = require('express')
const db = require('../db.config/db.config')
require('dotenv').config();
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_tiket = async (req, res, next) => {
    const { judul, aset, deskripsi, user, status, prioritas } = req.body;

    // Validasi input menggunakan regex dan aturan lainnya
    if (!judul || !aset || !deskripsi || !user) {
        return res.status(400).send('Semua kolom wajib diisi');
    }
    if (judul.length < 3) {
        return res.status(400).send('Judul harus memiliki minimal 3 karakter');
    }
    if (deskripsi.length < 10) {
        return res.status(400).send('Deskripsi harus memiliki minimal 10 karakter');
    }

    try {
        // Ambil ID user, aset, status, dan prioritas dari database berdasarkan nama yang diberikan
        const userIdQuery = await db.query('SELECT id FROM users WHERE username = $1', [user]);
        const userId = userIdQuery.rows[0]?.id;
        if (!userId) {
            return res.status(400).send('Invalid user');
        }

        const asetIdQuery = await db.query('SELECT id FROM aset WHERE nama = $1', [aset]);
        const asetId = asetIdQuery.rows[0]?.id;
        if (!asetId) {
            return res.status(400).send('Invalid aset');
        }

        let statusId = null;
        if (status) {
            const statusIdQuery = await db.query('SELECT id FROM status WHERE nama = $1', [status]);
            statusId = statusIdQuery.rows[0]?.id;
            if (!statusId) {
                return res.status(400).send('Invalid status');
            }
        }

        let prioritasId = null;
        if (prioritas) {
            const prioritasIdQuery = await db.query('SELECT id FROM prioritas WHERE nama = $1', [prioritas]);
            prioritasId = prioritasIdQuery.rows[0]?.id;
            if (!prioritasId) {
                return res.status(400).send('Invalid prioritas');
            }
        }

        // Generate nomor tiket using sequence
        const nomorTiketQuery = await db.query('SELECT nextval(\'tiket_nomor_seq\') AS nomor');
        const nomorTiket = nomorTiketQuery.rows[0]?.nomor;

        // Insert data tiket jaringan ke database
        const currentDate = new Date().toISOString();
        const newTicket = await db.query(
            'INSERT INTO tiket (judul, aset, deskripsi, user_id, status, prioritas, created_at, nomor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [judul, asetId, deskripsi, userId, statusId, prioritasId, currentDate, nomorTiket]
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
                prioritas.nama AS prioritas_nama,
                aset.nama AS aset_nama
        FROM tiket
                JOIN users ON tiket.user_id = users.id
                JOIN status ON tiket.status = status.id
                LEFT JOIN prioritas ON tiket.prioritas = prioritas.id
                JOIN aset ON tiket.aset = aset.id
        ORDER BY edited_at DESC
        `;
        const tikets = await db.query(query);

        res.status(200).json(tikets.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const solusi_populer = async (req, res, next) => {
    try {
        // Query untuk mengambil data tiket dan nama pengguna
        const query = `
        SELECT tiket.*, 
                users.username AS users_username, 
                status.nama AS status_nama, 
                prioritas.nama AS prioritas_nama,
                aset.nama AS aset_nama
        FROM tiket
                JOIN users ON tiket.user_id = users.id
                JOIN status ON tiket.status = status.id
                LEFT JOIN prioritas ON tiket.prioritas = prioritas.id
                JOIN aset ON tiket.aset = aset.id
        WHERE status IN (3, 4, 5)
        ORDER BY created_at ASC
        `;
        const tikets = await db.query(query);

        res.status(200).json(tikets.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_tiket_byUser = async (req, res, next) => {
    const { userId } = req.params; // Mengambil user_id dari parameter URL
    try {
        // Query untuk mengambil data tiket dan nama pengguna terkait user_id
        const query = `
            SELECT tiket.*, 
                users.username AS users_username, 
                status.nama AS status_nama, 
                prioritas.nama AS prioritas_nama,
                aset.nama AS aset_nama
            FROM tiket
            JOIN users ON tiket.user_id = users.id
            JOIN status ON tiket.status = status.id
            LEFT JOIN prioritas ON tiket.prioritas = prioritas.id
            JOIN aset ON tiket.aset = aset.id
            WHERE tiket.user_id = $1
            ORDER BY created_at DESC;
        `;
        
        const tikets = await db.query(query, [userId]);

        res.status(200).json(tikets.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Kesalahan dalam mengambil data tiket:', error);
        res.status(500).json({ message: 'Kesalahan Internal Server' });
    }
}

const show_aset_byDamage = async (req, res, next) => {
    try {
        // Query untuk mengambil data aset dan nama pengguna
        const query = `
            WITH kerusakan_tiket AS (
                SELECT 
                status,
                    tiket.aset, 
                    COUNT(tiket.id) OVER(PARTITION BY tiket.aset) AS jumlah_kerusakan
                FROM 
                    tiket
            )
            SELECT 
                kt.status,
                kt.aset AS aset_id, 
                kt.jumlah_kerusakan
            FROM 
                kerusakan_tiket kt
            JOIN 
                aset ON kt.aset = aset.id
            GROUP BY 
                kt.status, kt.aset, kt.jumlah_kerusakan
            ORDER BY 
                kt.aset ASC;
        `;
        const asets = await db.query(query);
        res.status(200).json(asets.rows); // Mengirim data aset sebagai respons
    } catch (error) {
        console.error('Kesalahan dalam mengambil data aset:', error);
        res.status(500).json({ message: 'Kesalahan Internal Server' });
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

const edit_tiket = async (req, res, next) => {
    const { id, judul, deskripsi, status, prioritas, solusi } = req.body;

    // Validasi input menggunakan regex dan aturan lainnya
    if (!judul || !deskripsi) {
        return res.status(400).send('Semua kolom wajib diisi');
    }
    if (judul.length < 3) {
        return res.status(400).send('Judul harus memiliki minimal 3 karakter');
    }
    if (deskripsi.length < 10) {
        return res.status(400).send('Deskripsi harus memiliki minimal 10 karakter');
    }

    try {
        // Ambil ID status dan prioritas dari database berdasarkan nama yang diberikan
        let statusId = null;
        if (status) {
            const statusIdQuery = await db.query('SELECT id FROM status WHERE nama = $1', [status]);
            statusId = statusIdQuery.rows[0]?.id;
            if (!statusId) {
                return res.status(400).send('Invalid status');
            }
        }

        // Ambil ID prioritas dari database berdasarkan nama yang diberikan jika prioritas ada
        let prioritasId = null;
        if (prioritas) {
            const prioritasIdQuery = await db.query('SELECT id FROM prioritas WHERE nama = $1', [prioritas]);
            prioritasId = prioritasIdQuery.rows[0]?.id;
            if (!prioritasId) {
                return res.status(400).send('Invalid prioritas');
            }
        }

        const currentDate = new Date().toISOString();
        const updateTicket = await db.query(
            'UPDATE tiket SET judul = $1, deskripsi = $2, status = $3, prioritas = $4, edited_at = $5 WHERE id = $6 RETURNING *',
            [judul, deskripsi, statusId, prioritasId, currentDate, id]
        );

        if (updateTicket.rowCount > 0) {
            // Insert solusi jika ada
            if (solusi) {
                await db.query(
                    'UPDATE tiket SET solusi = $2 WHERE id = $1',
                    [id, solusi]
                );
            }
            res.status(200).json({ message: 'Ticket updated successfully', ticket: updateTicket.rows[0] });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const get_chart = async (req, res, next) => {
    try {
        const query = `
            SELECT 
                EXTRACT(MONTH FROM created_at) AS month, 
                status,
                SUM(CASE WHEN prioritas = 4 THEN 1 ELSE 0 END) AS urgent,
                SUM(CASE WHEN prioritas = 3 THEN 1 ELSE 0 END) AS high,
                SUM(CASE WHEN prioritas = 2 THEN 1 ELSE 0 END) AS medium,
                SUM(CASE WHEN prioritas = 1 THEN 1 ELSE 0 END) AS low
            FROM tiket
            GROUP BY month, status
            ORDER BY month;
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const count_tiket = async (req, res, next) => {
    try {
        const statuses = ['Open', 'In Progress', 'On Hold', 'Resolved', 'Closed', 'Reopened'];
        const query = `
            SELECT s.nama AS status, COALESCE(COUNT(t.status), 0) AS count
            FROM status s
            LEFT JOIN tiket t ON t.status = s.id
            GROUP BY s.nama
        `;

        const result = await db.query(query);

        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('No data found');
        }

        const formattedResult = {};
        result.rows.forEach(row => {
            formattedResult[row.status] = parseInt(row.count);
        });

        res.json(formattedResult);
    } catch (error) {
        console.error('Error fetching ticket counts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

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

const getNotification = async (req, res, next) => {
    const { id } = req.body; // Misalnya Anda ingin mengambil notifikasi berdasarkan id

    try {
        // Ambil notifikasi dari database berdasarkan id
        const notifications = await db.query(
            'SELECT * FROM notifikasi WHERE id = $1'
            [id]
        );

        res.status(200).json(notifications.rows);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const search_tiket = async (req, res, next) => {
    const { search } = req.body; // Kata kunci pencarian

    try {
        // Query SQL untuk mencari data
        const result = await db.query(
            `SELECT tiket.*, aset.nama as aset_nama, status.nama as status_nama, prioritas.nama as prioritas_nama, users.username as users_username
                FROM tiket
                LEFT JOIN aset ON tiket.aset = aset.id
                LEFT JOIN status ON tiket.status = status.id
                LEFT JOIN prioritas ON tiket.prioritas = prioritas.id
                JOIN users ON tiket.user_id = users.id
                WHERE tiket.judul ILIKE $1 
                OR aset.nama ILIKE $1 
                OR users.username ILIKE $1 
                OR status.nama ILIKE $1 
                OR prioritas.nama ILIKE $1
                OR tiket.deskripsi ILIKE $1
                OR tiket.nomor::TEXT ILIKE $1`,
            [`%${search}%`]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    add_tiket,
    show_tiket,
    show_tiket_byUser,
    show_aset_byDamage,
    get_tiket,
    get_username, 
    get_chart,
    count_tiket,
    edit_tiket,
    remove_tiket,
    getNotification,
    search_tiket,
    solusi_populer,
}