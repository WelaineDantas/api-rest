# API de Estoque (EP2)

Esta é uma API RESTful desenvolvida em **Node.js + Express** para o gerenciamento de estoque.

## 🚀 Como executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie a API:
```bash
npm start
```

3. Acesse:
- Documentação Swagger: [http://localhost:3000/docs](http://localhost:3000/docs)
- Rota de teste: [http://localhost:3000/api/v1/products](http://localhost:3000/api/v1/products)

## 📌 Rotas principais

- `GET /api/v1/products` → Lista todos os produtos
- `GET /api/v1/products/:id` → Retorna um produto específico
- `POST /api/v1/products` → Cria um novo produto
- `PUT /api/v1/products/:id` → Atualiza dados de um produto
- `DELETE /api/v1/products/:id` → Remove um produto

## 🧪 Exemplos de uso (cURL)

- Listar produtos:
```bash
curl http://localhost:3000/api/v1/products
```

- Criar produto:
```bash
curl -X POST http://localhost:3000/api/v1/products -H "Content-Type: application/json" -d '{ "name": "Leite 1L", "quantity": 100, "price": 5.50 }'
```