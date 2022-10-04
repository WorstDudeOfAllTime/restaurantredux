import styles from "./../styles/Menu.module.css";
import MenuItem from "./MenuItem";
const Menu = ({ restaurantSearch, dishList }) => {
  return (
    <div className={`${styles.menuContainer} flexCent`}>
      {restaurantSearch.length >= 1
        ? dishList
            .filter(
              (dish) =>
                dish.name.includes(restaurantSearch) ||
                dish.name.toLowerCase().includes(restaurantSearch)
            )
            .map((item, index) => {
              return <MenuItem key={`${item.name}-${index}`} dish={item} />;
            })
        : dishList.map((item, index) => {
            return <MenuItem key={`${item.name}-${index}`} dish={item} />;
          })}
    </div>
  );
};

export default Menu;
