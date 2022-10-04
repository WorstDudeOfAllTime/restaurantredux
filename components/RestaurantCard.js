import styles from './../styles/RestaurantCard.module.css';
import React, { useContext } from 'react';
import CartContext from './CartContext';
import Link from 'next/link';
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
          <div style={{ height: '100%', width: '100%'}} className={'flexCent'}>
            <img
              src={restaurant.image}
              style={{
                marginLeft: '20px',
                height: 'auto',
                width: 'auto',
                maxHeight: '80%',
                maxWidth: '80%',
              }}
            />
          </div>
        </div>
        <div className={`${styles.descBox} flexCentCol`}>
          <h3>{restaurant.name}</h3>
          <h4>Rating: {restaurant.rating}</h4>
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
      </div>
    </Link>
  );
};
export default RestaurantCard;
