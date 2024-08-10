import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../utils/cartSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Card.css";
import { addtotal, substotal } from "../utils/totalSlice";
const Card = ({ item }) => {
  const location = useLocation().pathname;
  const cartItem = useSelector((store) => store.cart);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleClick = (item) => {
    if (location === "/products" && !cartItem.includes(item)) {
      dispatch(addProduct(item));
      dispatch(addtotal(item.price));
      toast.success("Item is Added in Your Cart");
    } else if (location === "/cart") {
      dispatch(substotal(item.price * quantity));
      dispatch(removeProduct(item.id));
      setQuantity(1);
    } else toast.warn("Item is Already Added in Cart");
  };
  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
    dispatch(addtotal(item.price));
  };
  const handleSubstract = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      dispatch(substotal(item.price));
    }
  };
  return (
    <div className="card-container">
      <div className="img">
        <img src={item.image} />
      </div>
      <div className="contents">
        <span className="title">{item.title}</span>
        <span className="full-title">{item.title}</span>
        <div className="lower-content">
          <span className="price">₹ {item.price}</span>
          <button
            onClick={() => handleClick(item)}
            style={{ margin: "5px 10px", width: "30px" }}
          >
            {location === "/products" ? (
              "+"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            )}
          </button>
          {location === "/cart" && (
            <div className="qty-counter">
              <button onClick={handleSubstract}>-</button>
              <span>{quantity}</span>
              <button onClick={handleAdd}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
