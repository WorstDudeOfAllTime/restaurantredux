import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import database from "../../../utils/firebase";
export default async function handler(req, res) {
  try {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.send(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} ${errorMessage}`);
      });
  } catch (err) {
    console.log(err);
  }
}
