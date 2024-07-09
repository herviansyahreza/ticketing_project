const express = require('express')
const db = require('../db.config/db.config')
require('dotenv').config();
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_status = async(req, res, next) => {
    const { nama,deskripsi } = req.body; // Ambil nama status dari body request

    try {
        // Query untuk menambahkan status ke dalam tabel status
        const result = await db.query('INSERT INTO status (nama,deskripsi) VALUES ($1,$2) RETURNING *', [nama,deskripsi]);
        
        // Jika berhasil ditambahkan, kembalikan status baru
        res.status(201).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error adding status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_status = async (req, res, next) => {
    try {
        // Query untuk mengambil semua data tiket
        const status = await db.query('SELECT * FROM status');

        res.status(200).json(status.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_status = async(req, res, next) => {
    const id_status = req.body.id_status;
    const { nama, deskripsi } = req.body; // Ambil nama status dari body request

    try {
        // Query SQL untuk mengedit status berdasarkan ID
        const result = await db.query('UPDATE status SET nama = $1, deskripsi = $2 WHERE id_status = $3 RETURNING *', [nama, deskripsi, id_status]);

        // Periksa apakah status berhasil diperbarui
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Status not found' });
        }

        // Jika berhasil diperbarui, kembalikan status yang sudah diperbarui
        res.status(200).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove_status = async(req, res, next) => {
    const  id_status  = req.body.id_status; // Ambil ID status dari parameter URL

    try {
        // Query SQL untuk menghapus status berdasarkan ID
        const result = await db.query('DELETE FROM status WHERE id_status = $1 RETURNING *', [id_status]);

        // Periksa apakah status berhasil dihapus
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Status not found' });
        }

        // Jika berhasil dihapus, kembalikan status yang telah dihapus
        res.status(200).json({ message: 'Status deleted successfully' });
    } catch (error) {
        console.error('Error deleting status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    add_status,
    show_status,
    edit_status,
    remove_status,
}