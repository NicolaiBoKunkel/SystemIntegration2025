# Code Documentation – Product Service (E-Commerce Project)

This folder contains code documentation for the `product-service` microservice from my DLS e-commerce project.

---

## How it was created:

- Tool: [JSDoc](https://jsdoc.app/)
- Comment style: JSDoc-format `/** ... */` comments added to:
  - `server.js` – API routes
  - `models/Product.js` – Mongoose schema
  - `middleware/auth.js` – Authentication middleware
- Config file: `jsdoc.json`
- Command to generate:
  ```bash
  npm run docs
