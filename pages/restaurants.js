import styles from "./../styles/Restaurants.module.css";
import RestaurantCard from "../components/RestaurantCard";
import TypeSelect from "../components/TypeSelect";
import React, { useState } from "react";

const Restaurants = ({ allRestaurants }) => {
  const [restaurantType, setRestaurantType] = useState(null);
  return (
    <div className={`${styles.restaurantsContainer} flexCent fadeIn`}>
      <div className={"half pageLeft flexCent"}>
        <TypeSelect setRestaurantType={setRestaurantType} />
      </div>
      <div className={`${styles.cardList} half pageRight`}>
        {restaurantType
          ? allRestaurants
              .filter((restaurant) =>
                restaurant.categories.includes(restaurantType)
              )
              .map((restaurant) => {
                return <RestaurantCard restaurant={restaurant} />;
              })
          : allRestaurants.map((restaurant) => {
              return <RestaurantCard restaurant={restaurant} />;
            })}
        {}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let response = await fetch("http://localhost:5000/restaurants");
  let data = await response.json();
  return { props: { allRestaurants: data } };
}

export default Restaurants;