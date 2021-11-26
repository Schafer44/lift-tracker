import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted } from "vue";
import "firebase/auth";
import { doc, onSnapshot, getDocs, querySnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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

export const createDay = (day) => {
  return dayCollection.add(day);
};
export const createLift = (lift) => {
  return LiftCollection.add(lift);
};

export const getDay = async (id) => {
  const day = await dayCollection.doc(id).get();
  console.log("day", day);
  return day.exists ? day.data() : null;
};

export const updateDay = (id, day) => {
  return dayCollection.doc(id).update(day);
};

export const useLoadWeek = () => {
  const week = ref([]);
  const close = dayCollection.orderBy("id", "asc").onSnapshot((snapshot) => {
    week.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return week;
};

export const getLift = async (id) => {
  const lift = await LiftCollection.doc(id).get();

  console.log("lift", day);
  return lift.exists ? lift.data() : null;
};

export const updateLiftLifts = (id, lift) => {
  console.log(id);
  console.log(LiftCollection);
  return LiftCollection.doc(id).update(lift);
};

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
