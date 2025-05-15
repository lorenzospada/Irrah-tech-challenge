```markdown
# API de Gerenciamento de Clientes
API Node.js para gerenciamento de clientes, autenticação via JWT e controle de acesso administrativo, utilizando Express e PostgreSQL e Docker + Dbeaver.
---
```

```
## Estrutura do Projeto

├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── clientController.js
│   ├── database/
│   │   └── database.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   └── routes/
│       ├── authRoutes.js
│       └── clientRoutes.js
├── init.sql
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
└── .gitignore
```

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/lorenzospada/Irrah-tech-challenge.git

2. Configure as variáveis de ambiente:

   * Edite o arquivo `.env` conforme necessário (exemplo disponível).

3. Suba os containers com Docker Compose:

   ```bash
   docker-compose up --build
   ```
   Isso irá: 
   -Instalar automaticamente as dependências com npm install.
   -iniciar o banco de dados PostgreSQL e a aplicação Node.js.

4. Crie a tabela com os dados do init.sql
---

## Endpoints

### Autenticação

* `POST /auth`

  * Body:

    ```json
    { "documentId": "..." }
    ```
  * Retorno:

    ```json
    { "token": "..." }
    ```

### Clientes

* `GET /clients`

  * Requer token JWT de admin
  * Lista todos os clientes

* `POST /clients`

   ```json
    {
    "name": "John Doe",
    "documentId": "123",
    "documentType": "CPF", //CPF ou CNPJ
    "planType": "postpaid", //  postpaid ou prepaid
    "balance": 0,
    "limit": 0,
    "active": true,
    "is_admin": true //false ou true
   }
   ```

  * Body: dados do cliente
  * Cria um novo cliente

* `GET /clients/:id`

  * Busca cliente por ID

* `PUT /clients/:id`

   ```json
    {
    "name": "John Doe",
    "documentId": "123",
    "documentType": "CPF", //CPF ou CNPJ
    "planType": "postpaid", //  postpaid ou prepaid
    "balance": 0,
    "limit": 0,
    "active": true,
    "is_admin": true //false ou true
   }
   ```

  * Body: dados do cliente
  * Atualiza cliente

* `GET /clients/:id/balance`

  * Requer token JWT
  * Consulta saldo do cliente

---

## Banco de Dados

* O schema precisa ser criado com base no arquivo `init.sql`.
* Tabela principal: `clients`.

---

## Scripts

* `npm run dev` — Inicia o servidor em modo desenvolvimento com `nodemon`.

---

## Variáveis de Ambiente

Veja o arquivo `.env` para exemplos de configuração, incluindo:

* `PORT`
* `DATABASE_URL`
* `JWT_SECRET`

---

## Observações

* O acesso a rotas administrativas requer que o campo `is_admin` do cliente seja `true`.
* O login é feito apenas com `documentId` (sem senha, para fins de demonstração).

---

## Licença
ISC
---

## Autor
# Lorenzo Spada



