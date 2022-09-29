import styles from "./../styles/MenuPage.module.css";
import CartContext from "../components/CartContext";
import Image from "next/image";
import burgerIcon from "./../components/3075977.png";
import React, { useEffect, useState, useContext } from "react";
import Menu from "../components/Menu";
const MenuPage = ({ allDishes }) => {
  const { currentRestaurant } = useContext(CartContext);
  const [restaurantSearch, setRestaurantSearch] = useState("");
  let sortedDishes = allDishes.filter(
    (dish) =>
      dish.type === currentRestaurant.categories[0] ||
      dish.type === currentRestaurant.categories[1] ||
      dish.type === currentRestaurant.categories[2]
  );
  return (
    <div className={`${styles.menuPageContainer} flexCentCol`}>
      <div
        className={styles.imageBanner}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1998&q=80)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className={`${styles.contentContainer} flexCentCol`}>
        <div className={`${styles.restInfo} flexCent`}>
          <div className={`${styles.nameBox} flexCentCol`}>
            <h2 className={styles.nameBoxText}>{currentRestaurant.name}</h2>
            <h3 className={styles.nameBoxText}>1300 S. Broad St</h3>
            <h3 className={styles.nameBoxText}>{currentRestaurant.rating}</h3>

            {currentRestaurant.categories.map((category) => {
              if (
                currentRestaurant.categories.indexOf(category) ===
                currentRestaurant.categories.length - 1
              ) {
                return <h6 className={styles.nameBoxText}>{category}</h6>;
              } else
                return <h6 className={styles.nameBoxText}>{category}, </h6>;
            })}
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

export async function getServerSideProps() {
  let response = await fetch(`http://localhost:5000/getDishes`);
  let data = await response.json();
  return { props: { allDishes: data } };
}

export default MenuPage;
