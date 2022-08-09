import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted } from "vue";
import "firebase/auth";
import { doc, onSnapshot, getDocs, querySnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
/*
 * Firebase setup file
 */

/*
 * Firebase config settings
 */
const firebaseConfig = {
  apiKey: "AIzaSyB0L8cmo7qLr-s_aCWQVYH0CHVeKME7D-s",
  authDomain: "tanner-lift-tracker.firebaseapp.com",
  databaseURL: "https://tanner-lift-tracker-default-rtdb.firebaseio.com",
  projectId: "tanner-lift-tracker",
  storageBucket: "tanner-lift-tracker.appspot.com",
  messagingSenderId: "383236940875",
  appId: "1:383236940875:web:3349af61be7ae4c03699ce",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
console.log("hey", db);
const dayCollection = db.collection("week");
console.log("dayC", dayCollection);
const LiftCollection = db.collection("Lifts");

/*
 * Function
 * Removes workout day
 * @param {day} day to be removed
 * @param {allLifts} all lifts that belong to that day that should be removed along with day
 */
export const removeDay = async (day) => {
  //return console.log(LiftCollection);
  const allLifts = await getLifts();
  console.log(allLifts);
  console.log(day.baseId);
  allLifts.forEach((lift) => {
    if (lift.parentId === day.baseId) {
      removeLift(lift);
    }
  });
  return dayCollection.doc(day.baseId).delete();
};
/*
 * Function
 * Removes day lift
 * @param {lift} lift to be removed
 */
export const removeLift = (lift) => {
  return LiftCollection.doc(lift.baseId).delete();
};

/*
 * Function
 * adds a day to the workout week
 * @param {day} day to be added
 */
export const createDay = (day) => {
  return dayCollection.add(day);
};

/*
 * Function
 * adds a lift to the workout day
 * @param {lift} lift to be added
 */
export const createLift = (lift) => {
  return LiftCollection.add(lift);
};

/*
 * Function
 * get the day from database
 * @param {id} id of the day
 */
export const getDay = async (id) => {
  const day = await dayCollection.doc(id).get();
  console.log("day", day);
  return day.exists ? day.data() : null;
};

/*
 * Function
 * Takes a id of a day and updates it with a new day
 * @param {id} id of the day
 * @param {day} the new day to update to
 */
export const updateDay = (id, day) => {
  return dayCollection.doc(id).update(day);
};

/*
 * Function
 * Loads the workout and orders it by day order
 */
export const useLoadWeek = () => {
  const week = ref([]);
  const close = dayCollection.orderBy("id", "asc").onSnapshot((snapshot) => {
    week.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return week;
};

/*
 * Function
 * get the lift from database
 * @param {id} id of the Lift
 */
export const getLift = async (id) => {
  const lift = await LiftCollection.doc(id).get();

  console.log("lift", day);
  return lift.exists ? lift.data() : null;
};
/*
 * Function
 * Takes a id of a lift and updates it with a new lift
 * @param {id} id of the lift
 * @param {day} the new lift to update to
 */
export const updateLiftLifts = (id, lift) => {
  console.log(id);
  console.log(LiftCollection);
  return LiftCollection.doc(id).update(lift);
};
/*
 * Function
 * Loads the lifts of a day and orders them by their id
 */
export const useLoadLifts = () => {
  const Lifts = ref([]);
  const close = LiftCollection.orderBy("id", "asc").onSnapshot((snapshot) => {
    Lifts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      baseId: doc.id,
    }));
  });

  onUnmounted(close);
  return Lifts;
};
/*
 * Function
 * get the lifts from database
 */
export const getLifts = async () => {
  var Lifts = "";
  const snapshot = await firebase.firestore().collection("Lifts").get();
  Lifts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    baseId: doc.id,
  }));
  console.log("fefe", Lifts);
  return Lifts;
};
