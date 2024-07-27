import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import Header from "./Header";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  return (
    <>
      <Header />
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="empty">
            <span style={{ fontWeight: "700", fontSize: "30px" }}>
              Cart is Empty
            </span>
            <Link style={{ textDecoration: "none" }} to="/products">
              <span className="back">Continue Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="main-container">
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <h1>Your Products</h1>
              <Link style={{ textDecoration: "none" }} to="/products">
                <span className="back">Continue Shopping</span>
              </Link>
            </div>
            <div className="cart-products">
              <ProductCard data={cartItems} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
