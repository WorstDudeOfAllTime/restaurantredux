import styles from "./../styles/OverlayForm.module.css";
const OverlayForm = ({ closeBoxFunction, children, formHeader }) => {
  return (
    <div className={`${styles.overlayFormContainer} flexCentCol`}>
      <div
        style={{
          height: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            closeBoxFunction(false);
          }}
          style={{
            background: "none",
            cursor: "pointer",
            color: "black",
            fontSize: "15px",
            fontWeight: "bold",
            width: "40px",
            textAlign: "center",
            margin: "0",
            border: "none",
          }}
        >
          X
        </button>
      </div>
      <div className={"flexCentCol"} style={{ height: "90%", width: "100%" }}>
        <h3 style={{ color: "black" }}>{formHeader}</h3>
        {children}
      </div>
    </div>
  );
};

export default OverlayForm;
