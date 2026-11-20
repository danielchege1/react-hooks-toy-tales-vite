import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header id="toy-header">
      <Link to="/" className="brand" aria-label="Toy Tales home">
        Toy Tales
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/products/new">Add product</NavLink>
      </nav>
    </header>
  );
}

export default Header;
