import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default async function handler(req, res) {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.send(user);
      })
      .catch((error) => {
        console.log(req.body);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} ${errorMessage}`);
        res.send(errorMessage);
      });
  } catch (err) {
    console.log(err);
  }
}
