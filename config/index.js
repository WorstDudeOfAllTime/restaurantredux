const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://restaurant-redux-7v1j00n1u-worstdudeofalltime.vercel.app/";
