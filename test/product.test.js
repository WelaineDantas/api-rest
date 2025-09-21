// product.test.js
const request = require('supertest');
const express = require('express');
const productsRoutes = require('../src/routes/products');

// Configuração do app de teste
const app = express();
app.use(express.json());
app.use('/api/v1/products', productsRoutes);

// Mock dos dados para isolamento dos testes
jest.mock('../src/data', () => {
  let products = [
    { id: 1, name: "Notebook Dell", quantity: 10, price: 3500.0 },
    { id: 2, name: "Mouse Logitech", quantity: 25, price: 120.0 },
    { id: 3, name: "Teclado Mecânico", quantity: 15, price: 450.0 }
  ];
  
  let nextId = 4;
  
  return {
    products,
    addProduct: jest.fn((product) => {
      const newProduct = { id: nextId++, ...product };
      products.push(newProduct);
      return newProduct;
    })
  };
});

describe('API de Produtos - Testes Automatizados', () => {
  
  // Listar todos os produtos
  describe('GET /api/v1/products', () => {
    test('Deve retornar lista de todos os produtos com status 200', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('quantity');
      expect(response.body[0]).toHaveProperty('price');
    });
  });

  // Buscar produto por ID válido
  describe('GET /api/v1/products/:id', () => {
    test('Deve retornar produto específico quando ID existe', async () => {
      const response = await request(app)
        .get('/api/v1/products/1')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toEqual({
        id: 1,
        name: "Notebook Dell",
        quantity: 10,
        price: 3500.0
      });
    });

    test('Deve retornar erro 404 quando produto não existe', async () => {
      const response = await request(app)
        .get('/api/v1/products/999')
        .expect('Content-Type', /json/)
        .expect(404);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Produto não encontrado');
    });
  });

  // Criar novo produto
  describe('POST /api/v1/products', () => {
    test('Deve criar novo produto com dados válidos', async () => {
      const novoProduto = {
        name: "Monitor Samsung",
        quantity: 5,
        price: 899.90
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(novoProduto)
        .expect('Content-Type', /json/)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(novoProduto.name);
      expect(response.body.quantity).toBe(novoProduto.quantity);
      expect(response.body.price).toBe(novoProduto.price);
    });

    test('Deve retornar erro 400 quando campos obrigatórios estão faltando', async () => {
      const produtoIncompleto = {
        name: "Produto Teste"
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(produtoIncompleto)
        .expect('Content-Type', /json/)
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Campos obrigatórios');
    });
  });  

  // Atualizar produto existente
  describe('PUT /api/v1/products/:id', () => {
    test('Deve atualizar produto existente com sucesso', async () => {
      const atualizacao = {
        name: "Notebook Dell i7",
        quantity: 8,
        price: 3600.0
      };

      const response = await request(app)
        .put('/api/v1/products/1')
        .send(atualizacao)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe(atualizacao.name);
      expect(response.body.quantity).toBe(atualizacao.quantity);
      expect(response.body.price).toBe(atualizacao.price);
    });

    test('Deve atualizar parcialmente quando apenas alguns campos são enviados', async () => {
      const atualizacaoParcial = {
        price: 125.0
      };

      const response = await request(app)
        .put('/api/v1/products/2')
        .send(atualizacaoParcial)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body.id).toBe(2);
      expect(response.body.name).toBe("Mouse Logitech"); 
      expect(response.body.quantity).toBe(25); 
      expect(response.body.price).toBe(125.0);
    });

    test('Deve retornar erro 404 ao tentar atualizar produto inexistente', async () => {
      const response = await request(app)
        .put('/api/v1/products/999')
        .send({ name: "Produto Fantasma" })
        .expect('Content-Type', /json/)
        .expect(404);
      
      expect(response.body.error).toBe('Produto não encontrado');
    });
  });

  // Deletar produto
  describe('DELETE /api/v1/products/:id', () => {
    test('Deve deletar produto existente com sucesso', async () => {
      // Primeiro verificamos que o produto existe
      await request(app)
        .get('/api/v1/products/3')
        .expect(200);

      // Deletamos o produto
      await request(app)
        .delete('/api/v1/products/3')
        .expect(204);
      
      // Verificamos que o produto não existe mais
      const response = await request(app)
        .get('/api/v1/products/3')
        .expect(404);
      
      expect(response.body.error).toBe('Produto não encontrado');
    });

    test('Deve retornar erro 404 ao tentar deletar produto inexistente', async () => {
      const response = await request(app)
        .delete('/api/v1/products/999')
        .expect('Content-Type', /json/)
        .expect(404);
      
      expect(response.body.error).toBe('Produto não encontrado');
    });
  });
});

