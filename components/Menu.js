import styles from "./../styles/Menu.module.css";
import MenuItem from "./MenuItem";
const Menu = ({ restaurantSearch, dishList }) => {
  return (
    <div className={`${styles.menuContainer} flexCent`}>
      {restaurantSearch.length >= 1
        ? dishList
            .filter((dish) => dish.name.includes(restaurantSearch))
            .map((item) => {
              return <MenuItem dish={item} />;
            })
        : dishList.map((item) => {
            return <MenuItem dish={item} />;
          })}
    </div>
  );
};

export default Menu;
