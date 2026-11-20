# Toy Tales Store Admin

Toy Tales is a responsive React single-page application for browsing and
administering a toy store's product collection. Products are persisted through
the local JSON Server API.

## Features

- Landing page with featured products
- Product search, creation, details, price/description editing, and deletion
- Client-side routes for `/`, `/products`, `/products/new`, and
  `/products/:toyId`
- A custom `useToys` hook for loading and performing CRUD operations
- Focused React Testing Library coverage for CRUD and search interactions

## Run locally

Install dependencies with `npm install`, then start each process in a separate
terminal:

```sh
npm run server
npm run dev
npm test -- --run
```

The JSON Server API is available at `http://localhost:3001/toys`. Vite prints
the local app URL when its development server starts.

## Product data

The seed data is in `db.json`. Each product has a name, image URL, likes, and
optional price and description. New products default to zero likes; prices are
entered in USD.
