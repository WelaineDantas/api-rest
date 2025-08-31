// Simulação de banco de dados em memória
let products = [
  { id: 1, name: "Notebook Dell", quantity: 10, price: 3500.0 },
  { id: 2, name: "Mouse Logitech", quantity: 25, price: 120.0 },
  { id: 3, name: "Teclado Mecânico", quantity: 15, price: 450.0 }
];

let nextId = products.length + 1;

// Função para adicionar produto
function addProduct(product) {
  const newProduct = { id: nextId++, ...product };
  products.push(newProduct);
  return newProduct;
}

module.exports = { products, addProduct };