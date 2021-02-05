import express from 'express';
import path from 'path';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileTypes = (file, cb) => {
  const acceptableFileTypes = /jpg|jpeg|png/;
  const isExtnameAccepted = acceptableFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isMimetypeAccepted = acceptableFileTypes.test(file.mimetype);

  if (isExtnameAccepted && isMimetypeAccepted) {
    cb(null, true);
  } else {
    cb('Images only');
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
}).single('image');

router.post('/', upload, (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
