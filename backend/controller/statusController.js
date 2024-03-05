const express = require('express')
const db = require('../db.config/db.config')
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const add_status = async(req, res, next) => {

}

const edit_status = async(req, res, next) => {
    
}

const remove_status = async(req, res, next) => {
    
}

module.exports = {
    add_status,
    edit_status,
    remove_status,
}