import { StyleSheet, View, Image } from "react-native";
import { Text, Title } from "react-native-paper";
import { GOOGLE_API_KEY } from "../environments";

export default function PlacesCard({ attraction }) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>{attraction.name}</Title>
      <Image
        source={{
          uri: attraction.photos ?
         "https://maps.googleapis.com/maps/api/place/photo" +
          "?maxwidth=400" +
          "&photo_reference="+
          attraction.photos[0].photo_reference +
          "&key=" + GOOGLE_API_KEY : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
        }}
        style={{width:"100%", height: 200, marginBottom: 10, borderWidth: 2, borderColor: "white"}} resizeMode="contain" />
        <View style={{flexDirection:'row', flexWrap: "wrap", alignItems: "center"}}>
        <Image source={require('../assets/globe.png')} style={{width: 25, height: 25, marginRight: 10}}></Image>
      <Text>Located at {attraction.vicinity}</Text>
      
      </View>
      <View style={{flexDirection:'row', alignItems: "center"}}>
      <Image source={require('../assets/star.png')} style={{width: 25, height: 25, marginRight: 10}}></Image>
      <Text>{attraction.rating ? `Rated ${attraction.rating}/5` : "No ratings yet"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#D8E7EB",
    borderWidth: 2,
    borderRadius: 7,
    marginTop: 7,
    width: "85%",
    height: "auto",
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center"
  }
});
