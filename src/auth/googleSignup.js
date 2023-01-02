import db from "../config/firestoreDb";
import firebase from "firebase";


export default async function googleSignup(authResult) {
  const {
    additionalUserInfo: { isNewUser, profile },
  } = authResult;

  const uid = await firebase.auth().currentUser.uid;
  const newUser = {
    username: "",
    first_name: "",
    last_name: "",
    profile_picture: "",
    contact: {
      email: "",
    },




  };

  //create unique username with timestamp
  let timestamp = new Date();
  timestamp = timestamp.getTime();
  newUser.username = "guest"

  newUser.first_name = ""
  newUser.last_name = ""
  newUser.profile_picture = ""
  newUser.contact = {
    email: "",
  };

  const creationTime = new Date();
  newUser.date_added = creationTime;
  newUser.date_updated = creationTime;
  newUser.oAuthInfo = profile;
  newUser.uid = uid;
  newUser.contact.email = profile.email;

  let userId = null;
  if (isNewUser) {
    try {
      const res = await db.collection("users").doc(uid).set(newUser);
    } catch (err) {
      console.error(err);
    }
    userId = uid;
  }
  return userId;
}


