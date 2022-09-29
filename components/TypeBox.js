import Image from "next/image";
const TypeBox = ({ setRestaurantType, selection }) => {
  return (
    <div
      className={`flexCent`}
      style={{
        height: "50px",
        width: "45%",
        color: "black",
        background: "rgb(149, 147, 255)",
        borderRadius: "3px",
        boxShadow: "2px 2px 6px rgba(0, 0, 0, .5)",
        margin: "0px 5px",
        justifyContent: "space-around",
        cursor: "pointer",
      }}
      onClick={() => {
        setRestaurantType(selection.type);
      }}
    >
      <img src={selection.img} style={{ height: "40px", width: "40px" }} />
      <h5>{selection.type}</h5>
    </div>
  );
};

export default TypeBox;
