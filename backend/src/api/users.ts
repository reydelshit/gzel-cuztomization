import express, { Router } from 'express';
import { databaseConnection } from '../connections/DBConnection';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';

  databaseConnection.query(query, (err, data) => {
    if (err)
      return res.status(500).json({ error: 'Database error', details: err });
    return res.json(data);
  });
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM users WHERE user_id = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, data) => {
    if (err)
      return res.status(500).json({ error: 'Database error', details: err });
    return res.json(data);
  });
});

// Create a new user
router.post('/create', (req, res) => {
  const query = `
    INSERT INTO users (
      firstName,
      lastName,
      email,
      password,
      created_at
    ) VALUES (?);
  `;

  const createdAtWithTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    createdAtWithTime,
  ];

  databaseConnection.query(query, [values], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    return res.json({
      ...data,
      message: 'User created successfully',
      status: 'success',
    });
  });
});

// Update user information
router.put('/update/:id', (req, res) => {
  const query = `
    UPDATE users 
    SET 
      firstName = ?,
      lastName = ?,
      email = ?,
      password = ?
    WHERE user_id = ?
  `;

  const id = req.params.id;
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    id,
  ];

  databaseConnection.query(query, values, (err, data) => {
    if (err) {
      console.error('SQL Error:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }

    return res.json({
      ...data,
      message: 'User updated successfully',
      status: 'success',
    });
  });
});

// Delete a user
router.delete('/delete/:id', (req, res) => {
  const query = 'DELETE FROM users WHERE user_id = ?';
  const id = req.params.id;

  databaseConnection.query(query, [id], (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: 'Failed to delete user', details: err });
    return res.json({
      ...data,
      message: 'User deleted successfully',
      status: 'success',
    });
  });
});

export const userRouter = router;
