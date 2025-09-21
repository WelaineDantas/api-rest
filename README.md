# API de Estoque (EP3)

Esta é uma API RESTful desenvolvida em **Node.js + Express** para o gerenciamento de estoque.

## 🚀 Como executar

1. Instale as dependências:
```bash
npm install
npm install morgan
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
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{ "name": "Leite 1L", "quantity": 100, "price": 5.50 }'
```

- Buscar produto específico:
```bash
curl http://localhost:3000/api/v1/products/1
```

- Atualizar produto:
```bash
curl -X PUT http://localhost:3000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Leite Integral 1L", "quantity": 150, "price": 5.75 }'
```

- Deletar produto:
```bash
curl -X DELETE http://localhost:3000/api/v1/products/1
```

## 🧪 Testes Automatizados

### Instalação das dependências de teste
```bash
npm install --save-dev jest supertest @types/jest
```

### Executar testes
```bash
# Rodar todos os testes
npm test

# Rodar testes em modo watch (desenvolvimento)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

### Suítes de teste implementadas

A API possui testes automatizados completos que cobrem:

✅ **Listagem de produtos (GET /api/v1/products)**
- Validação de status HTTP 200
- Verificação da estrutura de dados retornada
- Confirmação das propriedades dos produtos

✅ **Busca por ID (GET /api/v1/products/:id)**
- Busca com ID válido
- Tratamento de ID inexistente (404)

✅ **Criação de produtos (POST /api/v1/products)**
- Criação com dados válidos
- Validação de campos obrigatórios
- Tratamento de erros de validação (400)

✅ **Atualização de produtos (PUT /api/v1/products/:id)**
- Atualização completa de produto
- Atualização parcial de campos
- Tratamento de produto inexistente (404)

✅ **Remoção de produtos (DELETE /api/v1/products/:id)**
- Deleção bem-sucedida
- Verificação de remoção efetiva
- Tratamento de produto inexistente (404)

### Estrutura dos testes
```
tests/
└── product.test.js    # Arquivo principal com todos os testes
```

### Cobertura de código
Os testes cobrem:
- ✅ Todas as rotas CRUD
- ✅ Cenários de sucesso
- ✅ Cenários de erro
- ✅ Validação de dados
- ✅ Códigos de status HTTP

## 🌍 Possíveis usos da nossa API

Esta API poderia ser aplicada em diversos contextos de controle de estoque:
- **Mercearias e supermercados**: acompanhar a quantidade de itens em tempo real.
- **Farmácias**: controlar validade e disponibilidade de medicamentos.
- **Lojas de roupas**: registrar entrada e saída de peças do estoque.
- **E-commerce**: integração com vendas online para atualizar automaticamente o estoque.

## 📖 Tecnologias utilizadas

### Produção
- Node.js (>=18.0.0)
- Express
- Swagger UI
- Morgan (logging)

### Desenvolvimento e Testes
- Nodemon (hot-reload)
- Jest (framework de testes)
- Supertest (testes de integração HTTP)

## 🛠️ Scripts disponíveis

```bash
npm start         # Inicia o servidor em produção
npm run dev       # Inicia o servidor em modo desenvolvimento (com hot-reload)
npm test          # Executa todos os testes
npm run test:watch    # Executa testes em modo watch
npm run test:coverage # Gera relatório de cobertura de código
```

## 📁 Estrutura do Projeto

```
api-rest/
├── src/
│   ├── routes/
│   │   └── products.js      # Rotas de produtos
│   ├── data.js               # Simulação de banco de dados
│   ├── server.js             # Configuração do servidor
│   └── openapi.json          # Documentação Swagger
├── tests/
│   └── product.test.js       # Testes automatizados
├── package.json              # Dependências e scripts
├── package-lock.json         # Lock file
└── README.md                 # Este arquivo
```

## 💡 Boas Práticas Implementadas

- ✅ Documentação automática com Swagger
- ✅ Logging de requisições com Morgan
- ✅ Testes automatizados com Jest
- ✅ Validação de dados de entrada
- ✅ Tratamento adequado de erros
- ✅ Códigos de status HTTP apropriados
- ✅ Estrutura modular e escalável

## 🚦 Status do Projeto

- [x] CRUD completo de produtos
- [x] Documentação Swagger
- [x] Testes automatizados
- [x] Validação de dados
- [ ] Persistência em banco de dados
- [ ] Autenticação e autorização
- [ ] Paginação de resultados
- [ ] Filtros e busca avançada