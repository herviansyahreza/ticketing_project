const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const tiketController = require('../controller/tiketController')
const asetController = require('../controller/asetController')
const statusController = require('../controller/statusController')
const prioritasController = require('../controller/prioritasController')
const peranController = require('../controller/peranController')
const hakAksesController = require('../controller/hakAksesController')
const refreshToken = require('../controller/refreshToken')

const Auth = require('../middleware/auth')

//user
router.post('/register', userController.register)

router.post('/add_user', userController.add_user)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.post('/verify', Auth.verifyToken, userController.verify)

router.get('/show_user', userController.show_user)

router.get('/get_user/:id', userController.get_user)

router.put('/update/:id', userController.update)

router.delete('/remove/:id', userController.remove)

router.post('/search_user', userController.search_user)

router.get('/pending_user', userController.pending_user)

router.put('/approve_user/:id', userController.approve_user)

router.get('/token', refreshToken.refreshToken)

//tiket
router.post('/add_tiket', tiketController.add_tiket)

router.get('/show_tiket', tiketController.show_tiket)

router.get('/show_tiket_byUser/:userId', tiketController.show_tiket_byUser)

router.get('/show_aset_byDamage', tiketController.show_aset_byDamage)

router.get('/get_tiket/:id', tiketController.get_tiket)

router.get('/get_username', tiketController.get_username)

router.get('/get_chart', tiketController.get_chart)

router.get('/count_tiket', tiketController.count_tiket)

router.put('/edit_tiket/:id', tiketController.edit_tiket)

router.delete('/remove_tiket/:id', tiketController.remove_tiket)

router.get('/getNotification', tiketController.getNotification)

router.post('/search_tiket', tiketController.search_tiket)

router.get('/solusi_populer', tiketController.solusi_populer)

//aset
router.post('/add_aset', asetController.add_aset)

router.get('/show_aset', asetController.show_aset)

router.get('/get_aset/:id', asetController.get_aset)

router.get('/getAsets', asetController.getAsets)

router.put('/edit_aset/:id', asetController.edit_aset)

router.delete('/remove_aset/:id', asetController.remove_aset)

router.post('/search_aset', asetController.search_aset)

router.get('/getLokasi', asetController.getLokasi)

router.get('/getKategori', asetController.getKategori)

//status
router.post('/add_status', statusController.add_status)

router.get('/show_status', statusController.show_status)

router.put('/edit_status', statusController.edit_status)

router.delete('/remove_status', statusController.remove_status)

//prioritas
router.post('/add_prioritas', prioritasController.add_prioritas)

router.get('/show_prioritas', prioritasController.show_prioritas)

router.put('/edit_prioritas', prioritasController.edit_prioritas)

router.delete('/remove_prioritas', prioritasController.remove_prioritas)

//peran
router.post('/add_peran', peranController.add_peran)

router.get('/show_peran', peranController.show_peran)

router.put('/edit_peran', peranController.edit_peran)

router.delete('/remove_peran', peranController.remove_peran)

//hak akses
router.post('/add_hakAkses', hakAksesController.add_hakAkses)

router.get('/show_hakAkses', hakAksesController.show_hakAkses)

router.put('/edit_hakAkses', hakAksesController.edit_hakAkses)

router.delete('/remove_hakAkses', hakAksesController.remove_hakAkses)

module.exports = router