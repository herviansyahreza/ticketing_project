const express = require('express')
const db = require('../db.config/db.config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const register = async (req, res, next) => {
    const { username, email, password, peran, confirmPassword } = req.body;
    
    // Cek apakah password dan confirm password sama
    if (password !== confirmPassword) {
        return res.status(400).send('Password and confirm password do not match');
    }

    // Mengubah password menjadi hash
    const hashedPwd = await bcrypt.hash(password, 10);

    // Input data pengguna beserta ID peran ke database
    const currentDate = new Date().toISOString();
    try {
        const peranIdQuery = await db.query('SELECT id FROM peran WHERE nama = $1', [peran]);
        const peranId = peranIdQuery.rows[0]?.id;
        if (!peranId) {
            return res.status(400).send('Invalid role');
        }

        await db.query('INSERT INTO users (username, email, password, peran, created_at) VALUES ($1, $2, $3, $4, $5);', [username, email, hashedPwd, peranId, currentDate]);
        res.send('Data added successfully!');
    } catch (error) {
        console.error('Error inserting user data:', error.message);
        res.status(500).send('Input failure!');
    }
}

const add_user = async (req, res, next) => {
    const { username, email, password, peran } = req.body;
    
    // Cek apakah password dan confirm password sama
    // if (password !== confirmPassword) {
    //     return res.status(400).send('Password and confirm password do not match');
    // }

    // Mengubah password menjadi hash
    const hashedPwd = await bcrypt.hash(password, 10);

    // Input data pengguna beserta ID peran ke database
    const currentDate = new Date().toISOString();
    try {
        const peranIdQuery = await db.query('SELECT id FROM peran WHERE nama = $1', [peran]);
        const peranId = peranIdQuery.rows[0]?.id;
        if (!peranId) {
            return res.status(400).send('Invalid role');
        }

        await db.query('INSERT INTO users (username, email, password, peran, created_at) VALUES ($1, $2, $3, $4, $5);', [username, email, hashedPwd, peranId, currentDate]);
        res.send('Data added successfully!');
    } catch (error) {
        console.error('Error inserting user data:', error.message);
        res.status(500).send('Input failure!');
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
                    token: token,
                    peran: user.rows[0].peran
                    
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
        console.log('Logout Berhasil')
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ message: "Logout failed" });
    }
}

const verify = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Access denied, no token provided' });
        }
        // Mengambil token dari header
        const token = authHeader.split(' ')[1];

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

const show_user = async (req, res, next) => {
    try {
        // Query untuk mengambil data tiket dan nama pengguna
        const query = `
        SELECT users.*, 
                peran.nama AS peran_nama  
        FROM users
            JOIN peran ON users.peran = peran.id
        ORDER BY created_at ASC
        `;
        const users = await db.query(query);

        res.status(200).json(users.rows); // Mengirim data tiket sebagai respons
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const get_user = async (req, res, next) => {
    const id_user = req.params.id;
    try {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id_user]);
        if (user.rowCount > 0) {
            res.status(200).json(user.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const update = async (req, res, next) => {
    const { id, username, email, password, peran } = req.body;

    try {
        const peranIdQuery = await db.query('SELECT id FROM peran WHERE nama = $1', [peran]);
        const peranId = peranIdQuery.rows[0]?.id;
        if (!peranId) {
            return res.status(400).send('Invalid role');
        }
        // Query SQL untuk memperbarui data pengguna
        if (password) {
            // Jika password diubah, hash password baru
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('UPDATE users SET username = $1, email = $2, password = $3, peran = $4, edited_at = $5 WHERE id = $6', [username, email, hashedPassword, peranId, currentDate, id]);
        } else {
            // Jika password tidak diubah, hanya perbarui username, email, dan edited_at
            await db.query('UPDATE users SET username = $1, email = $2, peran = $3, edited_at = $4 WHERE id = $5', [username, email, peranId, currentDate, id]);
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
    const userId = req.params.id;

    try {
        // Query SQL untuk menandai pengguna sebagai dihapus
        const result = await db.query('DELETE FROM users WHERE id = $1', [userId]);

        // Kirimkan respons sukses
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        }else{
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Tangani kesalahan jika terjadi
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    add_user,
    login,
    logout,
    verify,
    show_user,
    get_user,
    update,
    remove,
}
