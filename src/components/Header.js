import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const cartItems = useSelector((store) => store.cart);
  return (
    <div className="header">
      <div className="left-section">
        <Link style={{ textDecoration: "none" }} to={"/products"}>
          <h1>Store</h1>
        </Link>
      </div>
      <div className="right-section">
        {location !== "/cart" && (
          <div className="cart">
            <Link style={{ textDecoration: "none" }} to="/cart">
              <span>Cart</span>
            </Link>
            {cartItems.length > 0 && (
              <span className="qty">{cartItems.length}</span>
            )}
          </div>
        )}
        <button
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
