const express = require('express');
const router = express.Router();
const db = require('../db/index.js');

router.get('/', async(req, res) => {
    try{
        const results = await db.query("SELECT * FROM post ORDER BY id DESC;")
        res.status(200).json({
            status: "success",
            count: results.rowCount,
            data: results.rows
        })
    }catch(err) {
        res.status(404).json({ message: err.message })
    }
});

router.post('/', async(req, res) => {
    const { title, content } = req.body;
    try{
        const result = await db.query("INSERT INTO post ( title, content ) values ($1, $2) RETURNING *;", [title, content])
        
        res.status(201).json({
            status: "success",
            data: result.rows
        })
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        const result = await db.query("SELECT * FROM post WHERE id=$1",[id])

        res.status(200).json({
            status: "success",
            data: result.rows
        })
    }catch(err) {
        res.status(404).json({ message: err.message })
    }
})

router.put('/:id', async(req,  res) => {
    const { id } = req.params;
    const { title, content, date_posted, } = req.body;

    try{
        const result = await db.query("UPDATE post SET title=$1, content=$2, date_posted=$3 WHERE id=$4 RETURNING *", [title, content, date_posted, id])

        res.status(200).json({
            status: "success",
            data: result.rows
        })
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        await db.query("DELETE FROM post WHERE id=$1", [id])
        res.status(204).json({ 
            status: "success",
            data: "successfully deleted"
         })
    }catch(err) {
        res.status(403).json({ message: err.message })
    }
})

module.exports = router;