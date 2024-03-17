const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_hakAkses = async(req, res, next) => {
    const { nama,deskripsi } = req.body; // Ambil nama hakAkses dari body request

    try {
        // Query untuk menambahkan hakAkses ke dalam tabel hakAkses
        const result = await db.query('INSERT INTO hak_akses (nama,deskripsi) VALUES ($1,$2) RETURNING *', [nama,deskripsi]);
        
        // Jika berhasil ditambahkan, kembalikan status baru
        res.status(201).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error adding hak akses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_hakAkses = async (req, res, next) => {
    try {
        // Query untuk mengambil semua data tiket
        const hak_akses = await db.query('SELECT * FROM hak_akses');

        res.status(200).json(hak_akses.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching hak akses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_hakAkses = async(req, res, next) => {
    const id_hakakses = req.body.id_hakakses;
    const { nama, deskripsi } = req.body; // Ambil nama hakAkses dari body request

    try {
        // Query SQL untuk mengedit hakAkses berdasarkan ID
        const result = await db.query('UPDATE hak_akses SET nama = $1, deskripsi = $2 WHERE id_hakakses = $3 RETURNING *', [nama, deskripsi, id_hakakses]);

        // Periksa apakah hakAkses berhasil diperbarui
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Hak Akses not found' });
        }

        // Jika berhasil diperbarui, kembalikan hakAkses yang sudah diperbarui
        res.status(200).json({ status: result.rows[0] });
    } catch (error) {
        console.error('Error updating hak akses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove_hakAkses = async(req, res, next) => {
    const  id_hakakses  = req.body.id_hakakses; // Ambil ID hakAkses dari parameter URL

    try {
        // Query SQL untuk menghapus hakAkses berdasarkan ID
        const result = await db.query('DELETE FROM hak_akses WHERE id_hakakses = $1 RETURNING *', [id_hakakses]);

        // Periksa apakah hakAkses berhasil dihapus
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Hak akses not found' });
        }

        // Jika berhasil dihapus, kembalikan hakAkses yang telah dihapus
        res.status(200).json({ message: 'Hak akses deleted successfully' });
    } catch (error) {
        console.error('Error deleting hak akses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    add_hakAkses,
    show_hakAkses,
    edit_hakAkses,
    remove_hakAkses,
}