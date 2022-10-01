import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export default {
  createUser: async (req, res) => {
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
  },
  loginUser: async (req, res) => {
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          res.send(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`${errorCode} ${errorMessage}`);
          res.send(errorMessage);
        });
    } catch (err) {
      console.log(err);
    }
  },
  signOutUser: async (req, res) => {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("You have signed out.");
        })
        .catch(error);
    } catch (err) {}
  },
};
