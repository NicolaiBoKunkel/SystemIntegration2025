# Product Collection Documentation

## Collection Name: `products`

This collection stores information about products listed on my e-commerce platform. Each document represents one product and contains key data such as name, price, stock, and category. The collection also tracks when each product was created or updated.

---

## Schema Overview

| Field        | Type   | Required | Default | Description |
|--------------|--------|----------|---------|-------------|
| `name`       | String |  Yes   | –       | The name/title of the product. |
| `description`| String |  No    | –       | A description of the product, detailing its features or benefits. |
| `price`      | Number |  Yes   | –       | The price of the product. |
| `category`   | String |  No    | –       | The category or classification of the product (e.g., Electronics, Apparel). |
| `stock`      | Number |  No    | -     | The quantity of the product available in inventory. |
| `imageUrl`   | String |  No    | –       | A URL pointing to an image of the product. |
| `createdAt`  | Date   | Auto     | –       | Timestamp of when the product was first created (automatically added by Mongoose). |
| `updatedAt`  | Date   | Auto     | –       | Timestamp of the last update to the product (automatically managed). |

---

## Sample Document

```json
{
  "_id": "661f9a44798afc14b3a6a917",
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with adjustable DPI settings.",
  "price": 24.99,
  "category": "Electronics",
  "stock": 35,
  "imageUrl": "https://example.com/images/wireless-mouse.jpg",
  "createdAt": "2025-04-15T09:23:17.342Z",
  "updatedAt": "2025-04-15T09:23:17.342Z"
}
```

---

## Notes

- The schema uses Mongoose’s `{ timestamps: true }` option to automatically generate and manage the `createdAt` and `updatedAt` fields.
- The `stock` field has a default value of `0`, ensuring that newly added products don’t show as in-stock unless specified.
- The schema currently does **not** include validation for `category`, `description`, or `imageUrl`, which means those fields are optional and unvalidated unless additional logic is added elsewhere.

---

## Use Cases

- Display product listings on the frontend (name, price, image).
- Search/filter products by category.
- Keep track of inventory (`stock`) to disable out-of-stock items.
- Show product details using `description` and `imageUrl`.
