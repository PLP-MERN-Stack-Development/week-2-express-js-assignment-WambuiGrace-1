const {v4: uuidv4} = require('uuid');
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];
 
// Get all products
exports.getAllProducts = (req, res) => {
    try {
      let result = [...products];
      //Filter by category
      if(req.query.category){
        result = result.filter(p => p.category === req.query.category);
      }
      //Filter by inStock
      if(req.query.inStock){
        const inStockFilter = req.query.inStock === 'true';
        result = result.filter(p => p.inStock === inStockFilter);
      }
      //Pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page -1) * limit;
      const endIndex = page * limit;
      const paginated = result.slice(startIndex, endIndex);
      
      res.json({
        total: result.length,
        page,
        limit,
        data: paginated
      });
    } catch (error) {
      res.status(500).json({message: "Server error", error: error.message});
    }
};

// Search products by name
exports.searchProducts = (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }
    
    const searchResults = products.filter(product => 
      product.name.toLowerCase().includes(q.toLowerCase())
    );
    
    res.json({
      total: searchResults.length,
      data: searchResults
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single product by ID
exports.getProductById = (req, res) => {
    try {
      const product = products.find(p => p.id === req.params.id);
      if(!product) {
        return res.status(404).json({message: 'Product not found'});
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({message: "Server error", error: error.message});
    }
};

// Create a new product
exports.createProduct = (req, res) => {
    try {
      const newProduct = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        inStock: req.body.inStock || false
      };
      products.push(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({message: "Server error", error: error.message});
    }
};

//Update a product
exports.updateProduct = (req, res) => {
    try {
      const index = products.findIndex(p => p.id === req.params.id);
      if(index === -1){
        return res.status(404).json({message: 'Product not found'});
      }
      const updatedProduct = {
        ...products[index],
        ...req.body,
      id: req.params.id
      };
      products[index] = updatedProduct;
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({message: "Server error", error: error.message});
    }
};

// Delete product
exports.deleteProduct = (req, res) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    products = products.filter(p => p.id !== req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

