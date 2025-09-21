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
});

