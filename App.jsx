import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
} from "@react-navigation/native";
import Constants from "expo-constants";
import {
  PaperProvider,
  Appbar,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  Switch,
  Badge,
} from "react-native-paper";
import Home from "./components/home";
import PlanTrip from "./components/plan-trip";
import merge from "deepmerge";
import {
  UserLocationContext,
  PolylineContext,
  DestinationContext,
} from "./components/Contexts";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState(null);
  const [destination, setDestination] = useState(null);
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <PolylineContext.Provider
        value={{ polylineCoordinates, setPolylineCoordinates }}
      >
        <DestinationContext.Provider value={{ destination, setDestination }}>
          <PaperProvider theme={theme}>
            <>
              <Appbar style={{ marginTop: Constants.statusBarHeight }}>
                <Appbar.Content title="Travel Chum" />
                <Image
                  style={styles.Image}
                  source={require("./assets/Travel-Chum-Logo.png")}
                />

                
                <Switch
                  color={"purple"}
                  value={isThemeDark}
                  onValueChange={toggleTheme}
                />
                <Badge>dark</Badge>
                <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => alert("ff")}
            >
                <Appbar.Action icon="account" />
                <Badge>login</Badge>
                </TouchableOpacity>
              </Appbar>
            </>
            <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Trip Planner" component={PlanTrip} />
              </Tab.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </DestinationContext.Provider>
      </PolylineContext.Provider>
    </UserLocationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "70%",
    height: "70%",
  },
  Image: {
    height: "100%",
    width: "15%",
    alignSelf: "center",
    resizeMode: "contain",
  },
});
