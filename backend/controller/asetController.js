const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_aset = async(req, res, next) => {
    const { nama,lokasi } = req.body;

    try {
        await db.query('INSERT INTO aset (nama, lokasi) VALUES ($1, $2)', [nama, lokasi]);

        res.status(201).json({ message: 'Asset added successfully' });
    } catch (error) {
        console.error('Error adding asset:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_aset = async (req, res, next) => {
    try {
        // Query untuk mengambil semua data tiket
        const asets = await db.query('SELECT * FROM aset');

        res.status(200).json(asets.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching asets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_aset = async(req, res, next) => {
    const id_aset = req.body.id_aset;
    const { nama,tempat } = req.body;

    try {
        const result = await db.query('UPDATE aset SET nama = $1, lokasi = $2 WHERE id_aset = $3', [nama,tempat,id_aset]);

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Asset updated successfully' });
        } else {
            res.status(404).json({ message: 'Asset not found' });
        }
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove_aset = async(req, res, next) => {
    const id_aset = req.params.id_aset;

    try {
        const result = await db.query('DELETE FROM aset WHERE id_aset = $1', [id_aset]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Aset deleted successfully' });
        } else {
            res.status(404).json({ message: 'Aset not found' });
        } 
    } catch (error) {
        console.error('Error deleting aset:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    add_aset,
    show_aset,
    edit_aset,
    remove_aset,
}