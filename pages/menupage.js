import styles from './../styles/MenuPage.module.css';
import CartContext from '../components/CartContext';
import Image from 'next/image';
import burgerIcon from './../components/img/3075977.png';
import React, { useEffect, useState, useContext } from 'react';
import Menu from '../components/Menu';
const MenuPage = () => {
  const {currentRestaurant} = useContext(CartContext);
  const [allDishes, setAllDishes] = useState([]);
  const [restaurantSearch, setRestaurantSearch] = useState('');
  useEffect(() => {
    const pullDishes = async () => {
      let response = await fetch(`/api/restaurant/get-dishes`);
      let data = await response.json();
      setAllDishes(data);
    };
    pullDishes();
  }, []);

  let sortedDishes = allDishes.filter(
    (dish) =>
      dish.type === currentRestaurant.categories[0] ||
      dish.type === currentRestaurant.categories[1] ||
      dish.type === currentRestaurant.categories[2]
  );

  if (!currentRestaurant || !currentRestaurant.categories) {
    return null;
  }

  return (
    <div className={`${styles.menuPageContainer} flexCentCol`}>
      <div
        className={styles.imageBanner}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className={`${styles.contentContainer} flexCentCol`}>
        <div className={`${styles.restInfo} flexCent`}>
          <div className={`${styles.nameBox} flexCentCol`}>
            <h2
              style={{ fontSize: 'calc(15px + 0.390625vw)' }}
              className={styles.nameBoxText}
            >
              {currentRestaurant.name}
            </h2>
            <h3 className={styles.nameBoxText}>1300 S. Broad St</h3>
            <h3 className={styles.nameBoxText}>
            Rating: {currentRestaurant.rating}</h3>
            <div className={styles.catWrap}>
              {currentRestaurant.categories.map((category, index) => {
                if (
                  currentRestaurant.categories.indexOf(category) ===
                  currentRestaurant.categories.length - 1
                ) {
                  return (
                    <h6
                      key={`${category}-${index}`}
                      className={styles.nameBoxText}
                    >
                      {category}
                    </h6>
                  );
                } else
                  return (
                    <h6
                      key={`${category}-${index}`}
                      className={styles.nameBoxText}
                    >
                      {category},{' '}
                    </h6>
                  );
              })}
            </div>
          </div>
          <div className={`${styles.searchBox} flexCentCol`}>
            <Image src={burgerIcon} height={130} width={130}></Image>
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search for food..."
              value={restaurantSearch}
              onChange={(e) => {
                setRestaurantSearch(e.target.value);
                console.log(restaurantSearch);
              }}
            ></input>
          </div>
        </div>
        <Menu
          dishList={sortedDishes}
          restaurantSearch={restaurantSearch}
        ></Menu>
      </div>
    </div>
  );
};

export default MenuPage;
