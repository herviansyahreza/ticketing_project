const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_peran = async(req, res, next) => {
    const { jenis_peran,deskripsi } = req.body; // Ambil nama peran dari body request

    try {
        // Query untuk menambahkan peran ke dalam tabel peran
        const result = await db.query('INSERT INTO peran (jenis_peran,deskripsi) VALUES ($1,$2) RETURNING *', [jenis_peran,deskripsi]);
        
        // Jika berhasil ditambahkan, kembalikan peran baru
        res.status(201).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error adding peran:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_peran = async (req, res, next) => {
    try {
        // Query untuk mengambil semua data tiket
        const peran = await db.query('SELECT * FROM peran');

        res.status(200).json(peran.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching peran:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_peran = async(req, res, next) => {
    const id_peran = req.body.id_peran;
    const { jenis_peran, deskripsi } = req.body; // Ambil nama peran dari body request

    try {
        // Query SQL untuk mengedit peran berdasarkan ID
        const result = await db.query('UPDATE peran SET jenis_peran = $1, deskripsi = $2 WHERE id_peran = $3 RETURNING *', [jenis_peran, deskripsi, id_peran]);

        // Periksa apakah peran berhasil diperbarui
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Peran not found' });
        }

        // Jika berhasil diperbarui, kembalikan peran yang sudah diperbarui
        res.status(200).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error updating peran:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove_peran = async(req, res, next) => {
    const  id_peran  = req.body.id_peran; // Ambil ID peran dari parameter URL

    try {
        // Query SQL untuk menghapus peran berdasarkan ID
        const result = await db.query('DELETE FROM peran WHERE id_peran = $1 RETURNING *', [id_peran]);

        // Periksa apakah peran berhasil dihapus
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Peran not found' });
        }

        // Jika berhasil dihapus, kembalikan peran yang telah dihapus
        res.status(200).json({ message: 'Peran deleted successfully' });
    } catch (error) {
        console.error('Error deleting peran:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    add_peran,
    show_peran,
    edit_peran,
    remove_peran,
}