const db = require('../database/database');

exports.createClient = async (req, res) => {
  const { name, documentId, documentType, planType, balance, limit, active, is_admin } = req.body;
  const isAdmin = typeof is_admin === 'boolean' ? is_admin : false;

  try {    
    const result = await db.query(
      `INSERT INTO clients (name, document_id, document_type, plan_type, balance, "limit", active, is_admin)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        documentId,
        documentType,
        planType,
        balance || 0,
        limit || 0,
        active ?? true,
        isAdmin
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, document_id, document_type, plan_type, balance, "limit", active FROM clients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, documentId, documentType, planType, balance, limit, active, is_admin } = req.body;

  try {                // Verifica se o documentId foi alterado
    if (documentId) {
      const check = await db.query(
        'SELECT id FROM clients WHERE document_id = $1 AND id != $2',
        [documentId, id]
      );
      if (check.rows.length > 0) {
        return res.status(400).json({ error: 'documentId já está em uso por outro cliente' });
      }
    }

    const result = await db.query(
      'UPDATE clients SET name = $1, document_id = $2, document_type = $3, plan_type = $4, balance = $5, "limit" = $6, active = $7, is_admin = $8 WHERE id = $9 RETURNING *',
      [name, documentId, documentType, planType, balance, limit, active, is_admin, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClientBalance = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'SELECT balance, "limit", plan_type FROM clients WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};