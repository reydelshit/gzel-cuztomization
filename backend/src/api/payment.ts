import express, { Router } from 'express';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

// Get all payment logs
router.get('/', (req, res) => {
  const query = 'SELECT * FROM payments_log';

  databaseConnection.query(query, (err, data) => {
    if (err)
      return res.status(500).json({ error: 'Database error', details: err });
    return res.json(data);
  });
});

// Get a specific payment log by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM payments_log WHERE tenants_id = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, data) => {
    if (err)
      return res.status(500).json({ error: 'Database error', details: err });
    return res.json(data);
  });
});

// Create a payment log
router.post('/create', (req, res) => {
  const query = `
    INSERT INTO payments_log (
      current_balance,
      amount_pay,
      tenants_id,
      created_at
    ) 
    VALUES (?);
  `;

  const createdAtWithTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const values = [
    req.body.current_balance,
    req.body.amount_pay,
    req.body.tenants_id,
    createdAtWithTime,
  ];

  databaseConnection.query(query, [values], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to create payment log' });
    }

    const updatePaymentStatusQuery = `UPDATE tenants SET payment_status = ? WHERE tenants_id = ?`;
    const updatePaymentStatusValues = ['On Going', req.body.tenants_id];

    databaseConnection.query(
      updatePaymentStatusQuery,
      updatePaymentStatusValues,
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res
            .status(500)
            .json({ error: 'Failed to update payment status' });
        }
      },
    );

    return res.json({
      ...data,
      message: 'Payment log created successfully',
      status: 'success',
    });
  });
});

// Update a payment log
router.put('/update/:id', (req, res) => {
  const query = `
    UPDATE payments_log 
    SET 
      current_balance = ?,
      amount_pay = ?,
      tenants_id = ?
    WHERE payment_id = ?
  `;

  const id = req.params.id;
  const values = [
    req.body.current_balance,
    req.body.amount_pay,
    req.body.tenants_id,
    id,
  ];

  databaseConnection.query(query, values, (err, data) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Failed to update payment log' });
    }

    return res.json({
      ...data,
      message: 'Payment log updated successfully',
      status: 'success',
    });
  });
});

// Delete a payment log
router.delete('/delete/:id', (req, res) => {
  const query = 'DELETE FROM payments_log WHERE payment_id = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: 'Failed to delete payment log', details: err });
    return res.json({
      ...data,
      message: 'Payment log deleted successfully',
      status: 'success',
    });
  });
});

export const paymentLogRouter = router;
