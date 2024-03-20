const express = require('express')
const db = require('../db.config/db.config');
const { get } = require('../router/router');
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_aset = async(req, res, next) => {
    const { nama, kategori, lokasi } = req.body;

    try {
        const kategoriIdQuery = await db.query('SELECT id FROM aset_kategori WHERE nama = $1', [kategori]);
        const kategoriId = kategoriIdQuery.rows[0]?.id;
        if (!kategoriId) {
            return res.status(400).send('Invalid kategori');
        }

        const lokasiIdQuery = await db.query('SELECT id FROM lokasi WHERE nama = $1', [lokasi]);
        const lokasiId = lokasiIdQuery.rows[0]?.id;
        if (!lokasiId) {
            return res.status(400).send('Invalid status');
        }

        await db.query('INSERT INTO aset (nama, kategori, lokasi) VALUES ($1, $2, $3)'
        , [nama, kategoriId, lokasiId]);

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

const get_aset = async (req, res, next) => {
    const id_aset = req.params.id;
    try {
        const asetr = await db.query('SELECT * FROM aset WHERE id = $1', [id_aset]);
        if (aset.rowCount > 0) {
            res.status(200).json(aset.rows[0]);
        } else {
            res.status(404).json({ message: 'Aset not found' });
        }
    } catch (error) {
        console.error('Error fetching aset:', error);
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
    const id = req.params.id;

    try {
        const result = await db.query('DELETE FROM aset WHERE id = $1', [id]);
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
    get_aset,
    edit_aset,
    remove_aset,
}