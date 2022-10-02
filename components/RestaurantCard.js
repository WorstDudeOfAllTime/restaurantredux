import styles from "./../styles/RestaurantCard.module.css";
import React, { useContext, useState } from "react";
import CartContext from "./CartContext";
import Image from "next/image";
import Link from "next/link";
const RestaurantCard = ({ restaurant }) => {
  const {
    setCurrentRestaurant,
    setCheckoutPrice,
    setShoppingCart,
    currentRestaurant,
  } = useContext(CartContext);
  return (
    <Link href="/menupage">
      <div
        className={`${styles.restaurantCard} flexCent`}
        onClick={() => {
          if (restaurant !== currentRestaurant) {
            setCurrentRestaurant(restaurant);
            setShoppingCart([]);
            setCheckoutPrice(0);
          }
        }}
      >
        <div className={`${styles.infoBox} flexCentCol`}>
          <div>
            <img
              src={restaurant.image}
              style={{ marginLeft: "20px", height: "120px", width: "auto" }}
            />
          </div>
        </div>
        <div className={`${styles.infoBox} flexCentCol`}>
          <h3>{restaurant.name}</h3>
          <h4>{restaurant.rating}</h4>
          <div className={`flexCent`}>
            {restaurant.categories.map((category, index) => {
              if (
                restaurant.categories.indexOf(category) ===
                restaurant.categories.length - 1
              ) {
                return <h6 key={`${category}-${index}`}>{category}</h6>;
              } else return <h6 key={`${category}-${index}`}>{category}, </h6>;
            })}
          </div>
        </div>
        <div className={`${styles.descBox} flexCentCol`}></div>
      </div>
    </Link>
  );
};
export default RestaurantCard;
