# Express.js REST API Project

## Overview

This project is a RESTful API built with Express.js that implements CRUD operations for a product management system. The application uses middleware for authentication, validation, and logging.

## Project Structure

```
project/
├── controllers/
│   └── products.js       # Handles product-related business logic
├── middleware/
│   ├── auth.js           # Authentication middleware
│   ├── logger.js         # Request logging middleware
│   ├── validation.js     # Product validation middleware
│   └── index.js          # Centralizes middleware exports
├── routes/
│   └── products.js       # Defines API endpoints for products
├── server.js             # Main application entry point
└── README.md             # Project documentation
```

## Core Components

### Server Configuration (server.js)

The main application file initializes Express, sets up middleware, connects routes, and implements error handling. It:
- Uses body-parser to parse JSON request bodies
- Implements global logging middleware
- Connects the products router
- Provides a global error handler
- Exports the app for testing purposes

### Middleware

The application uses several middleware functions:

1. **Authentication (auth.js)**: Verifies user identity before allowing access to protected routes
2. **Validation (validation.js)**: Ensures product data meets required format and constraints
3. **Logging (logger.js)**: Records incoming requests with timestamps

The middleware is centralized through an index.js file that exports all middleware functions, making imports cleaner throughout the application.

### Routes (products.js)

The products router defines the following endpoints:

- `GET /api/products`: Retrieve all products
- `GET /api/products/search`: Search for products
- `GET /api/products/:id`: Retrieve a specific product by ID
- `POST /api/products`: Create a new product (requires authentication and validation)
- `PUT /api/products/:id`: Update an existing product (requires authentication and validation)
- `DELETE /api/products/:id`: Delete a product (requires authentication)

### Controllers (products.js)

The products controller contains the business logic for handling product operations:
- Creating, reading, updating, and deleting products
- Searching products
- Error handling and response formatting

## Common Issues and Solutions

### Module Import Issues

One common issue encountered was related to middleware imports. When a module path like `../middleware` is specified without an index.js file, Node.js cannot resolve the module. The solution was to:

1. Create an index.js file in the middleware directory
2. Export all middleware functions from this central file
3. Import middleware using `require('../middleware')` which automatically looks for index.js

### Duplicate Identifier Declarations

Another issue was duplicate identifier declarations when importing the same middleware multiple times or from different sources. This was fixed by:

1. Ensuring each middleware function is imported only once
2. Using destructuring to import multiple functions from the middleware index
3. Removing redundant imports that cause naming conflicts

## Running the Application

To test or start the server:

```bash
nodemon server.js - for test mode
node server.js - for start mode
```

The server runs on port 3000 by default (http://localhost:3000) or the port specified in the environment variables.

## Error Handling

The application implements centralized error handling through Express's error middleware, providing consistent error responses with appropriate status codes and messages.

---

This Express.js application demonstrates best practices for building RESTful APIs including:
- Modular architecture with separation of concerns
- Middleware for cross-cutting concerns
- Centralized error handling
- Clean code organization