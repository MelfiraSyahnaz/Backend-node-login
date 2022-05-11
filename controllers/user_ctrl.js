'use strict' 

const db = require('../db')

module.exports = {
    getAll: (req, res) => {
        const sql = 'select * from admin'
        db.query(sql, (err, results) => {
            if (err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Semua Data",
                data: results
            })
        })
    },
    getId: (req, res) => {
        const id = req.params.id
        db.query(`select * from admin where id = '${id}'`, (err, results) => {
            if (err) throw (err)
            res.json({
                message: "Berhasil Menampilkan Data",
                data: results
            })
        })
    },
    add: (req, res) => {
        let user = {
            nama: req.body.nama,
            username: req.body.username,
            password: req.body.password,
        }
        db.query(`insert into user set ?`, user, (err, results) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil Menambahkan Data",
                    data: results
                })
            }
        })
    },
    update: (req, res) => {
        const id = req.params.id
        let user = {
            nama: req.body.nama,
            username: req.body.username,
            password: req.body.password,
            
        }
        db.query(`update user set ? where id = '${id}'`, user, (err, results) => {
            let response = null
            if (err) {
                res.send ({
                    message: err.message
                })
            } else {
                res.send({
                    message: "Berhasil Update Data",
                    data: results
                })
            }
        })
    },
    delete: (req, res) => {
        const id = req.params.id
        db.query(`delete from user where id = '${id}'`, (err, results) => {
            let response = null
            if (err) {
                response = {
                    message: err.message
                }
            } else {
                res.send({
                    message: "Berhasil Hapus Data",
                    data: results
                })
            }
        })
    }
}