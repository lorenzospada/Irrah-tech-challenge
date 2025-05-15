const jwt = require('jsonwebtoken');
const db = require('../database/database');

async function login(req, res) {
  const { documentId } = req.body;  

  try {
    const result = await db.query('SELECT * FROM clients WHERE document_id = $1', [documentId]);
    const client = result.rows[0];

    if (!client) {
      return res.status(401).json({ error: 'Cliente não encontrado' });
    }

    const token = jwt.sign(
      { clientId: client.id, documentId: client.document_id, plan: client.plan, isAdmin: client.is_admin }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao autenticar' });
  }
}

module.exports = { login };
