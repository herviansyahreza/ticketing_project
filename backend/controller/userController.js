const express = require('express')
const db = require('../db.config/db.config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const register = async(req, res, next) => {
    const{username,email,password,jabatan}= req.body;
    // mengubah password menjadi hash
    const hashed_pwd= await bcrypt.hash(password,10)
    
    // input data ke db
    try {
        db.query('INSERT INTO users(username,email,password,jabatan,created_at) VALUES ($1,$2,$3,$4,$5);',[username,email,hashed_pwd,jabatan,currentDate])
        res.send('data added succesfully!')
        
    } catch (error) {
        res.send('Input failure!')
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
        // Periksa apakah pengguna ada
        if (user.rowCount > 0) {
            // Memeriksa kesesuaian password
            const validPass = await bcrypt.compare(password, user.rows[0].password);
            // Periksa apakah password cocok
            if (validPass) {
                // Menghasilkan token dengan JWT
                const jwtSecretKey = 'kuncirahasia';
                const tokenData = {
                    userId: user.rows[0].id // Hanya menyimpan ID pengguna dalam token
                };
                const token = jwt.sign(tokenData, jwtSecretKey);
                
                // Mengembalikan ID, username, dan email
                res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" }).status(200).json({
                    id: user.rows[0].id,
                    username: user.rows[0].username,
                    email: user.rows[0].email,
                    token: token
                    
                });console.log("Login Berhasil");
            } else {
                return res.status(400).send('Wrong password!');   
            }
        } else {
            return res.status(400).json({
                error: "User is not registered, Sign Up first"
            });
        }
    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).send('Login failed');
    }
}

const logout = (req, res) => {
    try {
        // Menghapus cookie JWT dengan mengatur waktu kedaluwarsa ke masa lalu
        res.clearCookie("JWT", { httpOnly: true, sameSite: "strict", expires: new Date(0) });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ message: "Logout failed" });
    }
}

const verify = async (req, res, next) => {
    try {
        // Mendapatkan token dari header Authorization
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
        }

        // Memverifikasi token
        const jwtSecretKey = 'kuncirahasia';
        const decoded = jwt.verify(token, jwtSecretKey);

        // Mendapatkan data pengguna dari token
        const userId = decoded.userId;

        // Periksa apakah pengguna ada dalam database
        const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (user.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mengirimkan data pengguna ke klien
        return res.status(200).json({ user: user.rows[0] });
    } catch (err) {
        console.error('Error:', err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

const update = async (req, res, next) => {
    const userId = req.body.id;
    const { username, email, password } = req.body;

    try {
        // Query SQL untuk memperbarui data pengguna
        if (password) {
            // Jika password diubah, hash password baru
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('UPDATE users SET username = $1, email = $2, password = $3, edited_at = $4 WHERE id = $5', [username, email, hashedPassword, currentDate, userId]);
        } else {
            // Jika password tidak diubah, hanya perbarui username, email, dan edited_at
            await db.query('UPDATE users SET username = $1, email = $2, edited_at = $3 WHERE id = $4', [username, email, currentDate, userId]);
        }

        // Kirimkan respons sukses
        res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const remove = async (req, res, next) => {
    const userId = req.body.id;

    try {
        // Query SQL untuk menandai pengguna sebagai dihapus
        await db.query('UPDATE users SET deleted_at = $1 WHERE id = $2', [currentDate, userId]);

        // Kirimkan respons sukses
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    register,
    login,
    logout,
    verify,
    update,
    remove,
}
