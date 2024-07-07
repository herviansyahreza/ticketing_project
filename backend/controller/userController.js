const express = require('express')
const db = require('../db.config/db.config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const currentDate = new Date().toISOString(); // Mengambil waktu saat ini dalam format ISO

const register = async (req, res, next) => {
    const { username, email, password, nim, peran, confirmPassword } = req.body;

    // Validasi input pengguna
    if (!username || !email || !password || !confirmPassword || !peran || !nim) {
        return res.status(400).send('Semua kolom wajib diisi');
    }
    if (password !== confirmPassword) {
        return res.status(400).send('Password dan konfirmasi password tidak cocok');
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        return res.status(400).send('Password harus memiliki minimal 8 karakter, satu huruf kapital, dan satu angka');
    }
    const nimRegex = /^\d+$/;
    if (!nimRegex.test(nim)) {
        return res.status(400).send('NIM/NRP/NIP harus berupa angka');
    }

    // Mengubah password menjadi hash
    const hashedPwd = await bcrypt.hash(password, 10);

    // Input data pengguna beserta ID peran ke database
    const currentDate = new Date().toISOString();
    try {
        // Cek apakah email sudah terdaftar
        const emailExists = await db.query('SELECT 1 FROM users WHERE email = $1', [email]);
        if (emailExists.rowCount > 0) {
            return res.status(400).send('Email sudah terdaftar');
        }

        // Dapatkan ID peran dari nama peran
        const peranIdQuery = await db.query('SELECT id FROM peran WHERE nama = $1', [peran]);
        const peranId = peranIdQuery.rows[0]?.id;
        if (!peranId) {
            return res.status(400).send('Peran tidak valid');
        }

        // Masukkan data pengguna ke dalam tabel users
        await db.query('INSERT INTO users (username, email, password, peran, created_at, approved, nim) VALUES ($1, $2, $3, $4, $5, $6, $7);', [username, email, hashedPwd, peranId, currentDate, false, nim]);

        res.send('Registrasi berhasil! Silakan tunggu persetujuan dari admin.');
    } catch (error) {
        console.error('Kesalahan saat memasukkan data pengguna:', error.message);
        res.status(500).send('Registrasi gagal!');
    }
}


const add_user = async (req, res, next) => {
    const { username, email, password, peran, nim} = req.body;
    
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

        await db.query('INSERT INTO users (username, email, password, peran, created_at, nim) VALUES ($1, $2, $3, $4, $5, $6);', [username, email, hashedPwd, peranId, currentDate, nim]);
        res.send('Data added successfully!');
    } catch (error) {
        console.error('Error inserting user data:', error.message);
        res.status(500).send('Input failure!');
    }
}


const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1;';
        const userResult = await db.query(userQuery, [email]);
        
        // Periksa apakah pengguna ada
        if (userResult.rowCount > 0) {
            const user = userResult.rows[0];
            
            // Memeriksa kesesuaian password
            const validPass = await bcrypt.compare(password, user.password);
            
            if (validPass) {
                // Periksa apakah pengguna sudah disetujui oleh admin
                if (!user.approved) {
                    return res.status(403).send('Akun belum disetujui oleh admin');
                }

                // Menghasilkan token dengan JWT
                const jwtSecretKey = 'kuncirahasia';
                const tokenData = {
                    userId: user.id // Hanya menyimpan ID pengguna dalam token
                };
                const token = jwt.sign(tokenData, jwtSecretKey);
                
                // Mengembalikan ID, username, email, peran, dan token
                res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" }).status(200).json({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: token,
                    peran: user.peran
                });
                console.log("Login Berhasil");
            } else {
                return res.status(400).send('Password salah!');
            }
        } else {
            return res.status(400).json({
                error: "Pengguna belum terdaftar, silakan daftar terlebih dahulu"
            });
        }
    } catch (error) {
        console.error('Login gagal:', error);
        return res.status(500).send('Login gagal');
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
        // Query untuk mengambil data pengguna yang disetujui dan nama peran
        const query = `
        SELECT users.*, 
                peran.nama AS peran_nama  
        FROM users
            JOIN peran ON users.peran = peran.id
        WHERE users.approved = true
        ORDER BY peran.nama DESC, created_at DESC
        `;
        const users = await db.query(query);

        res.status(200).json(users.rows); // Mengirim data pengguna sebagai respons
    } catch (error) {
        console.error('Error fetching users:', error);
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
    const { id, username, email, password, peran, nim} = req.body;

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
            await db.query('UPDATE users SET username = $1, email = $2, password = $3, peran = $4, edited_at = $5, nim = $6 WHERE id = $7', [username, email, hashedPassword, peranId, currentDate, nim, id]);
        } else {
            // Jika password tidak diubah, hanya perbarui username, email, dan edited_at
            await db.query('UPDATE users SET username = $1, email = $2, peran = $3, edited_at = $4, nim = $5 WHERE id = $6', [username, email, peranId, currentDate, nim, id]);
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

const search_user = async (req, res, next) => {
    const { search } = req.body; // Kata kunci pencarian

    try {
        // Query SQL untuk mencari data
        const result = await db.query(
            `SELECT users.*, 
                peran.nama AS peran_nama  
            FROM users
                JOIN peran ON users.peran = peran.id
            WHERE 
                username ILIKE $1
                OR email ILIKE $1
                OR peran.nama ILIKE $1
            ORDER BY created_at ASC`,
                    [`%${search}%`]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const pending_user = async (req, res, next) => {
    try {
        const query = `
        SELECT users.*, 
                peran.nama AS peran_nama  
        FROM users
            JOIN peran ON users.peran = peran.id
        WHERE users.approved = false
        ORDER BY created_at ASC
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Kesalahan server saat mengambil pengguna' });
    }
};

const approve_user = async (req, res, next) => {
    const { id } = req.params;
    try {
        const query = `
        WITH updated_user AS (
            UPDATE users
            SET approved = true
            WHERE id = $1
            RETURNING id, username, email, peran, nim, created_at, edited_at, approved
        )
        SELECT updated_user.*, peran.nama AS peran_nama
        FROM updated_user
        JOIN peran ON updated_user.peran = peran.id;
        `;
        const result = await db.query(query, [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Kesalahan server saat menyetujui pengguna' });
    }
};

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
    search_user,
    pending_user,
    approve_user,
}
