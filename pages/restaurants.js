import styles from "./../styles/Restaurants.module.css";
import RestaurantCard from "../components/RestaurantCard";
import TypeSelect from "../components/TypeSelect";
import React, { useState } from "react";
import { server } from "../config";
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
              .map((restaurant, index) => {
                return (
                  <RestaurantCard
                    key={`${restaurant.name}-${index}`}
                    restaurant={restaurant}
                  />
                );
              })
          : allRestaurants.map((restaurant, index) => {
              return (
                <RestaurantCard
                  key={`${restaurant.name}-${index}`}
                  restaurant={restaurant}
                />
              );
            })}
        {}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let response = await fetch(`${server}/api/restaurant/restaurants`);
  let data = await response.json();
  return { props: { allRestaurants: data } };
}

export default Restaurants;
