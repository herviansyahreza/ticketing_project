const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_prioritas = async(req, res, next) => {

}

const edit_prioritas = async(req, res, next) => {
    
}

const remove_prioritas = async(req, res, next) => {
    
}

module.exports = {
    add_prioritas,
    edit_prioritas,
    remove_prioritas,
}