import React from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import { Callout } from "react-native-maps";

 const screenWidth = Dimensions.get("window").width;

 const CustomCallout = ({ marker, setSelectedAttractions }) => {
   return (
     <Callout tooltip onPress={()=>{
        setSelectedAttractions(currAttractions => {
        return [...currAttractions, marker]
      })}}>
       <View>
         <View style={styles.container}>
           
           <View style={{ paddingHorizontal: 16, paddingVertical: 8, flex: 1 }}>
            
             <Text
               style={{
                 fontWeight: "bold",
                 fontSize: 18,
               }}
             >
               {marker.name}
             </Text>

             <Text>{marker.description}</Text>

           </View>
         </View> 
         <View style={styles.triangle}></View>
       </View>
     </Callout>
   );
 };

 const styles = StyleSheet.create({
   container: {
     backgroundColor: "white",
     width: "auto",
     flexDirection: "row",
     borderWidth: 2,
     borderRadius: 12,
     overflow: "hidden",
   },
   triangle: {
     left: (screenWidth * 0.8) / 2 - 10,
     width: 0,
     height: 0,
     backgroundColor: "transparent",
     borderStyle: "solid",
     borderTopWidth: 20,
     borderRightWidth: 10,
     borderBottomWidth: 0,
     borderLeftWidth: 10,
     borderTopColor: "black",
     borderRightColor: "transparent",
     borderBottomColor: "transparent",
     borderLeftColor: "transparent",
   },
 });

 export default CustomCallout;