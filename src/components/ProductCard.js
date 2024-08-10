import React, { useState } from "react";
import "../styles/ProductCard.css";

import Card from "./Card";

const ProductCard = ({ data }) => {
  return data.map((item) => <Card item={item} />);
};

export default ProductCard;
