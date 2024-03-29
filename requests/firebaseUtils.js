const {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
} = require("firebase/firestore");

const { app, auth } = require("../config/firebase");
const db = getFirestore(app);

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

export async function getTripById(tripId) {
  const tripRef = doc(db, "trips", tripId);
  const docSnap = await getDoc(tripRef);

  if (docSnap.exists()) {
    const tripData = docSnap.data()
  //  console.log(tripData);
    return tripData;
  } else {
    console.log("Trip doesn't exist!");
    return "Trip doesn't exist!";
  }
}

export async function getTripsByCurrentUser() {
  const q = query(
    collection(db, "trips"),
    where("userId", "==", auth.currentUser.uid),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  const trips = [];
  querySnapshot.forEach((doc) => {
    trips.push({
      id: doc.id,
      ...doc.data(),
      createdTime: toDateTime(doc.data().timestamp.seconds).toLocaleString(),
    });
  });

  return trips;
}

async function getTrips() {
  const querySnapshot = await getDocs(collection(db, "trips"));
  const trips = [];

  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() });
  });
  return trips;
}


export async function postTrip({ polyline, origin, destination, tripName, selectedAttractions, numOfStops }) {

  const tripRef = doc(collection(db, "trips"));
  try {
     await setDoc(tripRef, {
      polyline: polyline,
      userId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
      origin: origin,
      destination: destination,
      tripName: tripName,
      numOfStops: numOfStops,
      selectedAttractions: selectedAttractions
    });
    return tripRef.id
  } catch (err) {
    console.error("Please log in to save a  trip");
  }
}

export async function updateTrip(tripId, updatedTrip) {
  const tripRef = doc(db, "trips", tripId);
  return await updateDoc(tripRef, updatedTrip);
}

export async function deleteTrip(tripId) {
  const tripRef = doc(db, "trips", tripId);
  await deleteDoc(tripRef);
}
