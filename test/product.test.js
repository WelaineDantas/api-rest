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


