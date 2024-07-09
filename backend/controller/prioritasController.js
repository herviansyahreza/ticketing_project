const express = require('express')
const db = require('../db.config/db.config')
require('dotenv').config();
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_prioritas = async(req, res, next) => {
    const { nama,deskripsi } = req.body; // Ambil nama prioritas dari body request

    try {
        // Query untuk menambahkan prioritas ke dalam tabel prioritas
        const result = await db.query('INSERT INTO prioritas (nama,deskripsi) VALUES ($1,$2) RETURNING *', [nama,deskripsi]);
        
        // Jika berhasil ditambahkan, kembalikan prioritas baru
        res.status(201).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error adding status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_prioritas = async (req, res, next) => {
    try {
        // Query untuk mengambil semua data tiket
        const prioritas = await db.query('SELECT * FROM prioritas');

        res.status(200).json(prioritas.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching prioritas:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_prioritas = async(req, res, next) => {
    const id_prioritas = req.body.id_prioritas;
    const { nama, deskripsi } = req.body; // Ambil nama prioritas dari body request

    try {
        // Query SQL untuk mengedit prioritas berdasarkan ID
        const result = await db.query('UPDATE prioritas SET nama = $1, deskripsi = $2 WHERE id_prioritas = $3 RETURNING *', [nama, deskripsi, id_prioritas]);

        // Periksa apakah prioritas berhasil diperbarui
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Prioritas not found' });
        }

        // Jika berhasil diperbarui, kembalikan prioritas yang sudah diperbarui
        res.status(200).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove_prioritas = async(req, res, next) => {
    const  id_prioritas  = req.body.id_prioritas; // Ambil ID prioritas dari parameter URL

    try {
        // Query SQL untuk menghapus prioritas berdasarkan ID
        const result = await db.query('DELETE FROM prioritas WHERE id_prioritas = $1 RETURNING *', [id_prioritas]);

        // Periksa apakah prioritas berhasil dihapus
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Prioritas not found' });
        }

        // Jika berhasil dihapus, kembalikan status yang telah dihapus
        res.status(200).json({ message: 'Prioritas deleted successfully' });
    } catch (error) {
        console.error('Error deleting status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    add_prioritas,
    show_prioritas,
    edit_prioritas,
    remove_prioritas,
}