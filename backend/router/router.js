const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const tiketController = require('../controller/tiketController')
const asetController = require('../controller/asetController')
const statusController = require('../controller/statusController')
const prioritasController = require('../controller/prioritasController')
const peranController = require('../controller/peranController')
const hakAksesController = require('../controller/hakAksesController')

const Auth = require('../middleware/auth')

//user
router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/logout', Auth.verifyToken, userController.logout)

router.post('/verify', Auth.verifyToken, userController.verify)

router.put('/update', userController.update)

router.delete('/delete', userController.remove)

//tiket
router.post('/add_tiket', tiketController.add_tiket)

router.put('/edit_tiket', tiketController.edit_tiket)

router.delete('/remove_tiket', tiketController.remove_tiket)

//aset
router.post('/add_aset', asetController.add_aset)

router.put('/edit_aset', asetController.edit_aset)

router.delete('/remove_aset', asetController.remove_aset)

//status
router.post('/add_status', statusController.add_status)

router.put('/edit_status', statusController.edit_status)

router.delete('/remove_status', statusController.remove_status)

//prioritas
router.post('/add_prioritas', prioritasController.add_prioritas)

router.put('/edit_prioritas', prioritasController.edit_prioritas)

router.delete('/remove_prioritas', prioritasController.remove_prioritas)

//peran
router.post('/add_peran', peranController.add_peran)

router.put('/edit_peran', peranController.edit_peran)

router.delete('/remove_peran', peranController.remove_peran)

//hak akses
router.post('/add_hakAkses', hakAksesController.add_hakAkses)

router.put('/edit_hakAkses', hakAksesController.edit_hakAkses)

router.delete('/remove_hakAkses', hakAksesController.remove_hakAkses)

module.exports = router