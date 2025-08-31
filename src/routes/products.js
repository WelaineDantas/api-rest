// src/routes/products.js
const express = require("express");
const router = express.Router();
const { products, addProduct } = require("../data");

// Listar todos os produtos
router.get("/", (req, res) => {
  res.json(products);
});

// Buscar produto por ID
router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id, 10));
  if (!product) return res.status(404).json({ error: "Produto não encontrado" });
  res.json(product);
});

// Criar novo produto
router.post("/", (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity == null || price == null) {
    return res.status(400).json({ error: "Campos obrigatórios: name, quantity, price" });
  }
  const newProduct = addProduct({ name, quantity, price });
  res.status(201).json(newProduct);
});

// Atualizar produto
router.put("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id, 10));
  if (!product) return res.status(404).json({ error: "Produto não encontrado" });

  const { name, quantity, price } = req.body;
  product.name = name ?? product.name;
  product.quantity = quantity ?? product.quantity;
  product.price = price ?? product.price;

  res.json(product);
});

// Remover produto
router.delete("/:id", (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: "Produto não encontrado" });

  products.splice(index, 1);
  res.status(204).send();
});


module.exports = router;