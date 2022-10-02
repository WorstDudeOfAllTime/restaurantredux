import styles from "./../styles/TypeSelect.module.css";
import TypeBox from "./TypeBox";
const TypeSelect = ({ setRestaurantType }) => {
  const foodTypes = [
    {
      type: "Pizza",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727378.png",
    },
    {
      type: "Convenience",
      img: "https://cdn-icons-png.flaticon.com/512/4689/4689889.png",
    },
    {
      type: "Chinese",
      img: "https://cdn-icons-png.flaticon.com/512/890/890099.png",
    },
    {
      type: "Asian",
      img: "https://cdn-icons-png.flaticon.com/512/791/791550.png",
    },
    {
      type: "Mexican",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727450.png",
    },
    {
      type: "American",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727200.png",
    },
    {
      type: " Fast Food",
      img: "https://cdn-icons-png.flaticon.com/512/1037/1037762.png",
    },
    {
      type: "Sushi",
      img: "https://cdn-icons-png.flaticon.com/512/4500/4500717.png",
    },

    {
      type: "Indian",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727322.png",
    },
    {
      type: " Dessert",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727254.png",
    },
    {
      type: "Ice Cream",
      img: "https://cdn-icons-png.flaticon.com/512/938/938063.png",
    },
    {
      type: "Lunch Specials",
      img: "https://cdn-icons-png.flaticon.com/512/3374/3374320.png",
    },
    {
      type: "Mediterranean",
      img: "https://cdn-icons-png.flaticon.com/512/1880/1880355.png",
    },
    {
      type: "Pasta",
      img: "https://cdn-icons-png.flaticon.com/512/1318/1318517.png",
    },
    {
      type: "Healthy",
      img: "https://cdn-icons-png.flaticon.com/512/135/135763.png",
    },
    {
      type: "Noodles",
      img: "https://cdn-icons-png.flaticon.com/512/3041/3041130.png",
    },

    {
      type: "Halal",
      img: "https://cdn-icons-png.flaticon.com/512/4840/4840224.png",
    },
    {
      type: "Wings",
      img: "https://cdn-icons-png.flaticon.com/512/2719/2719292.png",
    },
    {
      type: "Steak",
      img: "https://cdn-icons-png.flaticon.com/512/4652/4652004.png",
    },
    {
      type: "Vegan",
      img: "https://cdn-icons-png.flaticon.com/512/4490/4490701.png",
    },
    {
      type: "Italian",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727428.png",
    },
    {
      type: "Soup",
      img: "https://cdn-icons-png.flaticon.com/512/4727/4727284.png",
    },
    {
      type: "Seafood",
      img: "https://cdn-icons-png.flaticon.com/512/1699/1699937.png",
    },
  ];
  return (
    <div className={`${styles.selectionContainer} flexCent`}>
      <div className={`${styles.clearIt} flexCent`}>
        <button
          onClick={() => {
            setRestaurantType(null);
          }}
        >
          Clear Selection
        </button>
      </div>
      {foodTypes.map((type, index) => {
        return (
          <TypeBox
            key={`${type}-${index}`}
            setRestaurantType={setRestaurantType}
            selection={type}
          />
        );
      })}
    </div>
  );
};

export default TypeSelect;
