import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    console.log('Upload path:', uploadPath);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log('Created upload folder.');
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log('Filename:', filename);
    cb(null, filename);
  },
});

const upload = multer({ storage });

// ✅ Get all designs
router.get('/', (req, res) => {
  const query = 'SELECT * FROM save_design';

  databaseConnection.query(query, (err, data) => {
    if (err)
      return res.status(500).json({ error: 'Database error', details: err });
    return res.json(data);
  });
});

// ✅ Get a single design by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM save_design WHERE saveDesignID = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, data: any[]) => {
    if (err)
      return res.status(500).json({ error: 'Database error', details: err });
    return res.json(data[0]);
  });
});

// ✅ Create a new design
router.post(
  '/create',
  upload.single('design_image'),
  (req: express.Request, res: express.Response): void => {
    if (!req.file) {
      res.status(400).json({ message: 'No image uploaded' });
      return;
    }

    const { designName } = req.body;

    // Image path to store in the database
    const designPath = path.join('uploads', req.file.filename);
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = `
      INSERT INTO save_design (designPath, designName, created_at) 
      VALUES (?, ?, ?);
    `;
    const values = [designPath, designName, createdAt];

    databaseConnection.query(query, values, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Database insert failed' });
        return;
      }

      res.json({
        status: 'success',
        message: 'Design saved successfully!',
        data: { designName, designPath },
      });
    });
  },
);

// ✅ Update a design
router.put('/update/:id', upload.single('design'), (req, res) => {
  const { designName } = req.body;
  const id = req.params.id;

  let query = 'UPDATE save_design SET designName = ? WHERE saveDesignID = ?';
  let values = [designName, id];

  if (req.file) {
    const newDesignPath = `/uploads/${req.file.filename}`;
    query =
      'UPDATE save_design SET designName = ?, designPath = ? WHERE saveDesignID = ?';
    values = [designName, newDesignPath, id];
  }

  databaseConnection.query(query, values, (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to update design' });

    return res.json({
      message: 'Design updated successfully',
      status: 'success',
    });
  });
});

// ✅ Delete a design
router.delete('/delete/:id', (req, res) => {
  const query = 'SELECT designPath FROM save_design WHERE saveDesignID = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, results: any[]) => {
    if (err || results.length === 0)
      return res.status(404).json({ error: 'Design not found' });

    const filePath = path.join(__dirname, '../', results[0].designPath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    databaseConnection.query(
      'DELETE FROM save_design WHERE saveDesignID = ?',
      [id],
      (deleteErr, data) => {
        if (deleteErr)
          return res.status(500).json({ error: 'Failed to delete design' });

        return res.json({
          message: 'Design deleted successfully',
          status: 'success',
        });
      },
    );
  });
});

export const designRouter = router;
