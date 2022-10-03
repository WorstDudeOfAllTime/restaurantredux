import styles from "./../styles/Restaurants.module.css";
import RestaurantCard from "../components/RestaurantCard";
import TypeSelect from "../components/TypeSelect";
import React, { useState, useEffect } from "react";
const Restaurants = () => {
  const [restaurantType, setRestaurantType] = useState(null);
  const [allRestaurants, setAllRestaurants] = useState([])
  useEffect(()=>{
    const dataPull = async () => {
      let response = await fetch(`/api/restaurant/restaurants`);
      let data = await response.json();
      console.log(data);
      setAllRestaurants(data);
    }
    dataPull();
  }, [])
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

export default Restaurants;
