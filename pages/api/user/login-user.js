import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import database from "./../../../utils/firebase";
export default async function handler(req, res) {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        console.log("here we are");
        const user = userCredential.user;
        res.send(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(error);
      });
  } catch (err) {}
}
