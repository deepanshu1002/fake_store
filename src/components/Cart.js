import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import Header from "./Header";
import { clearTotal } from "../utils/totalSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const total = useSelector((store) => store.total);
  if (cartItems.length === 0) {
    dispatch(clearTotal());
  }
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
              <div className="total">Total: {"₹" + " " + total.toFixed(2)}</div>
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
