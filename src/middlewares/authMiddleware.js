const jwt = require('jsonwebtoken');
const db = require('../database/database');

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'Token é necessário!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { documentId } = decoded;

    const result = await db.query('SELECT * FROM clients WHERE document_id = $1', [documentId]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Cliente não encontrado!' });
    }

    req.client = result.rows[0]; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido!' });
  }
};

//  verificar se o cliente é admin
exports.isAdmin = (req, res, next) => {
  const client = req.client;  

  if (!client.is_admin) {
    return res.status(401).json({ message: 'Acesso negado! Somente admins podem acessar esta rota.' });
  }
  next();
};
