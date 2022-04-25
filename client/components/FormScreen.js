import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Tabs from "./Tabs";
import { NavigationContainer } from "@react-navigation/native";

const FormScreen = ({ navigation, route }) => {
  const [address, setAddress] = useState(null); //Used to set the pin
  const [input, onChangeInput] = useState("Useless Text"); //Used to update address as it's typed
  const [name, setName] = useState(""); //Name of Rally

  const { username } = route.params;
  // console.log(username);

  const [location, setLocation] = useState(null); //Used for user location
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({
    //Used for setting marker
    latitude: 44.3874,
    longitude: 44.1686,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({});

      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  async function handleSetPin() {
    let details = await Location.geocodeAsync(address);
    setPin({
      latitude: details[0].latitude,
      longitude: details[0].longitude,
    });
    // console.log(details);
  }

  //Post request to create the map and store it in database
  async function handleSubmit(name, marker, participants) {
    // console.log("posted");
    // console.log(name);
    // console.log(marker);
    // console.log(participants);
    fetch("http://192.168.1.151:4077/createrally", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rallyName: name,
        marker: marker,
        participants: participants,
      }),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.firstcont}>
          <TextInput
            style={styles.input}
            placeholder={"Search for location"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TouchableOpacity
            style={styles.inputButtons}
            onPress={() => handleSetPin()}
          >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>mark!</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.secondcont}>
          <TextInput
            style={styles.input}
            placeholder={"What's the occasion?"}
            onChangeText={(text) => setName(text)}
          />
          <TouchableOpacity
            style={styles.inputButtons}
            onPress={() => {
              handleSubmit(name, pin, [
                {
                  userId: username,
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
              ]);
              navigation.navigate("Home", { username: username });
            }}
          >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>create!</Text>
            </View>
          </TouchableOpacity>
        </View>

        {location && (
          <MapView
            zoomEnabled={true}
            followsUserLocation={true}
            userInterfaceStyle={"dark"}
            loadingEnabled={true}
            mapType="satellite"
            showsUserLocation={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              title={"Rally Point"}
              pinColor="magenta"
              draggable={true}
              onDragStart={(e) => {
                console.log("drag start", e.nativeEvent.coordinates);
              }}
              onDragEnd={(e) => {
                console.log("drags tart", e.nativeEvent.coordinates);
                setPin({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
              }}
              coordinate={pin}
            />
          </MapView>
        )}
      </View>
      {/* <NavigationContainer>
        <Tabs />
      </NavigationContainer> */}
    </SafeAreaView>
  );
};

//STYLES PORTIONs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
  },

  firstcont: {
    flexDirection: "row",
    backgroundColor: "grey",
  },

  secondcont: {
    flexDirection: "row",
    backgroundColor: "grey",
  },

  topinput: {},

  input: {
    margin: 40,
    position: "absolute",
    opacity: 20,
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: `#e6e6fa`,
    width: 310,
    borderColor: `#778899`,
    borderWidth: 1,

    borderRadius: 7,
  },

  inputButtons: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: `#e6e6fa`,
    width: 80,
    borderColor: `#778899`,
    borderWidth: 1,

    borderRadius: 7,
  },

  // circular: {
  //   width: 12,
  //   height: 12,
  //   borderColor: "rgba(255, 0, 255, 1.0)",
  //   borderWidth: 2,
  //   borderRadius: 5,
  // },

  container: {},
});

// const styles = StyleSheet.create({
//   item: {},
// });

export default FormScreen;
