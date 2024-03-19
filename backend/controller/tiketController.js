const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_tiket = async(req, res, next) => {
    const { judul,laporan,nama_client,email_client,aset } = req.body;

    try {
        // Insert data tiket jaringan ke database
        const newTicket = await db.query(
            'INSERT INTO tiket (judul,laporan,nama_client,email_client,aset,created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [judul,laporan,nama_client,email_client,aset,currentDate]
        );

        res.status(201).json(newTicket.rows[0]);
    } catch (error) {
        console.error('Error adding network ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const show_tiket = async (req, res, next) => {
    try {
        // Query untuk mengambil semua data tiket
        const tikets = await db.query('SELECT * FROM tiket');

        res.status(200).json(tikets.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const edit_tiket = async(req, res, next) => {
    const { id_tiket, judul, laporan, nama_client, email_client, aset } = req.body;
    try {
        const result = await db.query('UPDATE tiket SET judul = $1, laporan = $2, nama_client = $3, email_client = $4, aset = $5, edited_at = $6 WHERE id_tiket = $7', [judul, laporan, nama_client, email_client, aset, currentDate, id_tiket]);
        if (result.rowCount > 0) {
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
    const id_tiket = req.params.id_tiket;
    try {
        const result = await db.query('DELETE FROM tiket WHERE id_tiket = $1', [id_tiket]);
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

module.exports = {
    add_tiket,
    show_tiket,
    edit_tiket,
    remove_tiket,
}