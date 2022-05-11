const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require("../db")

const secret = '#$@^%$^%*&%$$@&'

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    registrasi: (req, res) => {
        const {
            nama,
            email,
            password
        } = req.body
        if (!nama_lengkap, !email || !password) {
            res.status(402).json({
                message: "nama, email dan password harus diisi!"
            })
        }
        return db.query('insert into  set ?', {
            nama,
            email,
            password: hashPassword(password)
        }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            return res.json({
                message: 'registrasi berhasil',
                data: result
            })
        })
    },

    login: (req, res) => {
        const {
            email,
            password
        } = req.body
        if (!email || !password) res.status(402).json({
            message: 'email dan password harus diisi.'
        })
        return db.query('select * from admin where email = ?', email, (err, result) => {
            if (err) {
                return req.status(500).json({
                    err
                })
            }
            const user = result[0]
            if (typeof user === 'undefined') {
                return res.status(401).json({
                    message: 'user tidak ditemukan'
                })
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({
                    message: 'email dan password tidak sesuai'
                })
            }
            const token = jwt.sign({
                data: user
            }, secret)
            return res.json({
                message: 'Login berhasil. Silahkan menggunakan token dibawah ini untuk mengakses endpoint private lain',
                token
            })
        })
    },

    getAll: (req, res) => {
        db.query(`select * from admin`, (err, results) => {
            if (err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Semua Data",
                result : results
            })
        })
    },

    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from admin where id = '${id}'`, (err, results) => {
            if (null, err) throw err
            res.json({
                message: "Data admin",
                result: results
            })
        })
    }
}