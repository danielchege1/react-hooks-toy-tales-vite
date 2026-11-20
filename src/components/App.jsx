import React, { useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import useToys from "../hooks/useToys";

function App() {
  return (
    <BrowserRouter>
      <ApplicationRoutes />
    </BrowserRouter>
  );
}

function ApplicationRoutes() {
  const { toys, loading, error, addToy, updateToy, deleteToy, likeToy } =
    useToys();

  return (
    <>
      <Header />
      {error && <p className="error-message" role="alert">{error}</p>}
      {loading && (
        <p className="status-message" role="status">
          Loading products…
        </p>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              toys={toys}
              onLike={likeToy}
              onDelete={deleteToy}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductsPage
              toys={toys}
              onLike={likeToy}
              onDelete={deleteToy}
            />
          }
        />
        <Route
          path="/products/new"
          element={<CreateProductPage onAddToy={addToy} />}
        />
        <Route
          path="/products/:toyId"
          element={
            <ProductDetailPage
              toys={toys}
              onUpdateToy={updateToy}
              onDelete={deleteToy}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function HomePage({ toys, onLike, onDelete }) {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Toy Tales · Store admin</p>
        <h1>Make room for a little more wonder.</h1>
        <p>
          Manage your toy collection, keep product details up to date, and
          discover the next favorite in your store.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" to="/products">
            Browse products
          </Link>
          <Link className="secondary-link" to="/products/new">
            Add a Toy
          </Link>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the collection</p>
            <h2>Featured products</h2>
          </div>
          <Link to="/products">View all products</Link>
        </div>
        <ToyContainer toys={toys} onLike={onLike} onDelete={onDelete} />
      </section>
    </main>
  );
}

function ProductsPage({ toys, onLike, onDelete }) {
  const [search, setSearch] = useState("");
  const filteredToys = toys.filter((toy) =>
    toy.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <main className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Store inventory</p>
          <h1>Products</h1>
        </div>
        <Link className="primary-link" to="/products/new">
          Add a product
        </Link>
      </div>
      <label className="search-label" htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        className="search-input"
        type="search"
        placeholder="Search by product name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {filteredToys.length ? (
        <ToyContainer
          toys={filteredToys}
          onLike={onLike}
          onDelete={onDelete}
        />
      ) : (
        <p className="status-message" role="status">
          No products match “{search}”.
        </p>
      )}
    </main>
  );
}

function CreateProductPage({ onAddToy }) {
  const navigate = useNavigate();

  async function handleAddToy(toyDetails) {
    const newToy = await onAddToy(toyDetails);
    if (newToy) {
      navigate("/products");
    }
  }

  return (
    <main className="page-section">
      <Link to="/products">← Back to products</Link>
      <h1>Add a product</h1>
      <ToyForm onAddToy={handleAddToy} />
    </main>
  );
}

function ProductDetailPage({ toys, onUpdateToy, onDelete }) {
  const { toyId } = useParams();
  const navigate = useNavigate();
  const toy = toys.find((item) => String(item.id) === toyId);

  if (!toy) {
    return <NotFoundPage />;
  }

  async function handleUpdateToy(changes) {
    const updatedToy = await onUpdateToy(toy.id, changes);
    if (updatedToy) {
      navigate("/products");
    }
  }

  async function handleDelete() {
    const deleted = await onDelete(toy.id);
    if (deleted) {
      navigate("/products");
    }
  }

  return (
    <main className="page-section detail-page">
      <Link to="/products">← Back to products</Link>
      <h1>{toy.name}</h1>
      <div className="detail-layout">
        <img src={toy.image} alt={toy.name} />
        <section>
          <p>{toy.description || "A lovely addition to the Toy Tales collection."}</p>
          <p className="product-price">
            {Number.isFinite(Number(toy.price))
              ? `$${Number(toy.price).toFixed(2)}`
              : "Price not set"}
          </p>
          <ToyForm
            initialValues={toy}
            onAddToy={handleUpdateToy}
            submitLabel="Save changes"
          />
          <button className="del-btn" type="button" onClick={handleDelete}>
            Delete product
          </button>
        </section>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="page-section">
      <h1>Product not found</h1>
      <Link to="/products">Return to products</Link>
    </main>
  );
}

export default App;
