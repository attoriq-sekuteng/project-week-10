const multer = require('multer');
const fs = require('fs');
const { uploadPhoto } = require('../models/photo');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, filename);
    },
  });
  
  const upload = multer({ storage });
  
  const uploadPhotoController = (req, res) => {
    try {
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ error: 'Gagal mengunggah berkas.' });
        }
  
        if (!req.file) {
          return res.status(400).json({ error: 'Tidak ada berkas yang diunggah.' });
        }
  
        const filename = req.file.filename;
  
        const query = 'INSERT INTO movies (photo) VALUES ($1) RETURNING id';
        const values = [filename];
  
        db.query(query, values, (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Gagal menyimpan informasi gambar ke database.' });
          }
  
          const photoId = result.rows[0].id;
  
          res.status(201).json({ message: 'Berkas berhasil diunggah dan informasi disimpan.', photoId });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah berkas.' });
    }
  };
  
  module.exports = { uploadPhotoController };
