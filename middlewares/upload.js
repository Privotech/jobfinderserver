const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads', 'resumes');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${Buffer.from(file.originalname, 'latin1').toString('utf8').slice(-50)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /\.(pdf|doc|docx)$/i.test(file.originalname);
    if (allowed) cb(null, true);
    else cb(new Error('Only PDF and DOC/DOCX are allowed'));
  },
});

module.exports = upload;
