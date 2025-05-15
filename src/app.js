const express = require('express');
const app = express();
const clientRoutes = require('./routes/clientRoutes'); 

app.use(express.json());

app.use('/clients', clientRoutes);

const authRoutes = require('./routes/authRoutes'); 
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
