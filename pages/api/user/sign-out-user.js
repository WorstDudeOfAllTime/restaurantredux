import { getAuth, signOut } from "firebase/auth";
export default async function handler(req, res) {
  try {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("You have signed out.");
        res.send();
      })
      .catch(error);
  } catch (err) {}
}
