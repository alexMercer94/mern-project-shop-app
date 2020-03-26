const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, db) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.jpeg' || ext !== '.png') {
            return cb(res.status(400).end('Solo las extensiones .jpg y .png son permitidas'));
        }
        cb(null, true);
    }
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

/**
 * Route in order to upload product's images
 */
router.post('/uploadImage', auth, (req, res) => {
    // Afer getting that image from client
    // It need to save it inside Node server
    // Multer library
    upload(req, res, err => {
        if (err) return res.json({ success: false, errr });
        return res.json({ success: true, image: res.req.file.path, filename: res.req.file.filename });
    });
});

/**
 * Route in order to save a product from client in DB
 */
router.post('/uploadProduct', auth, (req, res) => {
    const product = new Product(req.body);

    product.save(err => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

module.exports = router;
