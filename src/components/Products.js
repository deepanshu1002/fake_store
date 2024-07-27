import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/Products.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const Products = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const json = await res.json();
    setData(json);
    const categories = json.map((item) => item.category);
    const uniqueCategories = [...new Set(categories)];
    const finalData = uniqueCategories.map((category) => {
      return {
        category: category,
        products: json.filter((item) => item.category === category),
      };
    });
    setCategories(finalData);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (sessionStorage.getItem("name")) {
    return (
      <div className="products">
        <Header />
        <div className="container">
          {categories.map((item, i) => {
            return (
              <div key={i} className="category">
                <h1>
                  {item.category
                    .split(" ")
                    .map(
                      (item, i) => item[0].toUpperCase() + item.slice(1) + " "
                    )}
                </h1>
                <div className="product-card">
                  <ProductCard data={item.products} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
};

export default Products;
