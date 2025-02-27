import express, { Router } from 'express';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

router.get('/get-stalls', (req, res) => {
  const query = 'SELECT * FROM tenants WHERE stall_no = ?';
  const stall = req.query.stall_no;
  databaseConnection.query(query, [stall], (err, data: any[]) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(data[0]);
  });
});

router.put('/mark-overdue/:id', (req, res) => {
  const id = req.params.id;
  const query = `UPDATE tenants SET payment_status = 'Overdue' WHERE tenants_id = ?`;
  databaseConnection.query(query, [id], (err, data: any) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ message: 'Tenant marked as overdue' });
  });
});

// Update a lease duration for renewal
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { lease_duration } = req.body;

  console.log(
    `Received request to update tenant ID: ${id}, with lease duration: ${lease_duration}`,
  );

  const createdAtWithTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const query = `
      UPDATE tenants
      SET 
        lease_duration = ?,
        created_at = ?,
        renewal_counter = renewal_counter + 1
      WHERE tenants_id = ?;
    `;

  const values = [lease_duration, createdAtWithTime, id];

  databaseConnection.query(query, values, (err, data: any) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Failed to update lease duration' });
    }

    if (data.affectedRows > 0) {
      return res.json({
        message: 'Tenant lease duration updated successfully',
        status: 'success',
      });
    } else {
      return res.status(404).json({ error: 'Tenant not found' });
    }
  });
});

export const miscRouter = router;
