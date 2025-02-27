import express, { Router } from 'express';
import path from 'path';
import multer from 'multer';
import { databaseConnection } from '../connections/DBConnection';
import fs from 'fs';

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

// Get all tenants
router.get('/', (req, res) => {
  const query = 'SELECT * FROM tenants';

  databaseConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get('/payments', (req, res) => {
  const query = `
    SELECT 
    tenants.*,
    COALESCE(SUM(payments_log.amount_pay), 0) AS current_total_payments,
    -- Total lease amount calculation based on duration
    CASE
        WHEN tenants.lease_duration = '3 months' THEN 24000
        WHEN tenants.lease_duration = '6 months' THEN 48000
        WHEN tenants.lease_duration = '9 months' THEN 72000
        WHEN tenants.lease_duration = '1 year' THEN 96000
        ELSE 0
    END AS total_amount,
    -- Current balance calculation
    CASE
        WHEN tenants.lease_duration = '3 months' THEN 24000
        WHEN tenants.lease_duration = '6 months' THEN 48000
        WHEN tenants.lease_duration = '9 months' THEN 72000
        WHEN tenants.lease_duration = '1 year' THEN 96000
        ELSE 0
    END - COALESCE(SUM(payments_log.amount_pay), 0) AS total_amount_to_pay
FROM 
    tenants
LEFT JOIN 
    payments_log 
ON 
    tenants.tenants_id = payments_log.tenants_id
    AND payments_log.created_at >= tenants.created_at 
GROUP BY 
    tenants.tenants_id, 
    tenants.name, 
    tenants.created_at, 
    tenants.lease_duration, 
    tenants.business_name, 
    tenants.stall_no;
      `;

  databaseConnection.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Get specific tenant by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM tenants WHERE tenants_id = ?';
  const id = req.params.id;
  databaseConnection.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post(
  '/test-upload',
  upload.fields([{ name: 'id_proof_path' }, { name: 'signed_lease_path' }]),
  (req, res) => {
    const files = req.files as Record<string, Express.Multer.File[]>;

    if (files) {
      console.log('Files uploaded:', files);
      res.json({ message: 'Files uploaded successfully', files });
    } else {
      res.status(400).json({ message: 'No files were uploaded' });
    }
  },
);

// Create tenant
router.post(
  '/create',
  upload.fields([{ name: 'id_proof_path' }, { name: 'signed_lease_path' }]),
  (req, res) => {
    const files = req.files as Record<string, Express.Multer.File[]>;

    const idProofPath = files?.['id_proof_path']
      ? path.join('uploads', files['id_proof_path'][0].filename)
      : 'uploads/default_id_proof.jpeg';
    const signedLeasePath = files?.['signed_lease_path']
      ? path.join('uploads', files['signed_lease_path'][0].filename)
      : 'uploads/default_signed_lease.jpeg';

    const paymentStatus = 'Unpaid';
    // Database query for inserting tenant information
    const query = `
        INSERT INTO tenants (
          name, 
          date_birth, 
          gender, 
          address,
          nationality, 
          email, 
          phone, 
          business_name, 
          business_type, 
          lease_duration, 
          id_proof_path, 
          signed_lease_path, 
          created_at, 
          stall_no,
          payment_status
        ) 
        VALUES (?);
      `;

    const createdAtWithTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const values = [
      req.body.name,
      req.body.date_birth,
      req.body.gender,
      req.body.address,
      req.body.nationality,
      req.body.email,
      req.body.phone,
      req.body.business_name,
      req.body.business_type,
      req.body.lease_duration,
      idProofPath,
      signedLeasePath,
      createdAtWithTime,
      req.body.stall_no,
      paymentStatus,
    ];

    databaseConnection.query(query, [values], (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database insert failed' });
      }

      return res.json({
        ...data,
        message: 'Successfully added tenant',
        status: 'success',
      });
    });
  },
);

// Update tenant
router.put(
  `/update/:id`,
  upload.fields([{ name: 'id_proof_path' }, { name: 'signed_lease_path' }]),
  (req, res) => {
    const query = `
    UPDATE tenants 
    SET 
      name = ?,
      date_birth = ?,
      gender = ?,
      address = ?,
      nationality = ?,
      email = ?,
      phone = ?,
      business_name = ?,
      business_type = ?,
      lease_duration = ?,
      id_proof_path = ?,
      signed_lease_path = ?,
      stall_no = ?
    WHERE tenants_id = ?
  `;

    const id = req.params.id;

    const files = req.files as Record<string, Express.Multer.File[]>;
    const idProofPath = files?.['id_proof_path']
      ? path.join('uploads', files['id_proof_path'][0].filename)
      : req.body.id_proof_path;
    const signedLeasePath = files?.['signed_lease_path']
      ? path.join('uploads', files['signed_lease_path'][0].filename)
      : req.body.signed_lease_path;

    const values = [
      req.body.name,
      req.body.date_birth,
      req.body.gender,
      req.body.address,
      req.body.nationality,
      req.body.email,
      req.body.phone,
      req.body.business_name,
      req.body.business_type,
      req.body.lease_duration,
      idProofPath,
      signedLeasePath,
      req.body.stall_no,
    ];

    databaseConnection.query(query, [...values, id], (err, data) => {
      if (err) {
        console.error('SQL Error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      return res.json({
        ...data,
        message: 'Successfully updated tenant',
        status: 'success',
      });
    });
  },
);

// Delete tenant
router.delete('/delete/:id', (req, res) => {
  const query = 'DELETE FROM tenants WHERE tenants_id = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json({
      ...data,
      message: 'Successfully deleted tenant',
      status: 'success',
    });
  });
});

export const tenantRouter = router;
