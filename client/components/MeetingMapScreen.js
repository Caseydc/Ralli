import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import Participant from "./Participant";
import * as Location from "expo-location";
import io from "socket.io-client";

//I need to retreive marker data, each participant's location
const MeetingMapScreen = ({ navigation, route }) => {
  const socket = io("http://192.168.1.150:4077");

  //let id = "waiting for id";
  socket.on("connection", (socket) => {
    //console.log(socket.id);
    // displayMessage("You connected with id");
  });

  const [position, setPosition] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  const [pin, setPin] = useState([]);
  const { username } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("Chad");
  const [text, setText] = useState(null);
  const [name, setName] = useState(""); //Name of new user
  const [location, setLocation] = useState({
    coords: {
      accuracy: 14.139034868415898,
      altitude: 5.452469825744629,
      altitudeAccuracy: 11.977757453918457,
      heading: -1,
      latitude: 41.39495849609375,
      longitude: 2.1976738653878347,
      speed: -1,
    },
  }); //Used for user location
  const [errorMsg, setErrorMsg] = useState(null);
  const [counter, setCounter] = useState(0);

  //SOCKET
  useEffect(() => {
    socket.emit("position", {
      //id: id,
      userId: username,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, [location]);

  socket.on("otherPositions", (users) => {
    //setPosition(users); //This will set an array of other user info of users who are also broadcasting their location
    setOtherUsers(users.filter((el) => el.userId !== username));
    console.log("PTHER USERS", otherUsers);
    // console.log(otherUsers)
    // console.log("THIS IS FROM SOCKECT", users);
    // console.log("This is from state", position);
  });

  const getRallies = async () => {
    try {
      const response = await fetch("http://192.168.1.150:4077/rallies");
      const json = await response.json();
      setData([...json]);
      // console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("OTHER USERS", otherUsers);
  // console.log(id);
  //console.log("SOCKETS", position);

  useEffect(() => {
    getRallies();

    //WILL BE USED FOR periodically updating user coordinates.
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getLastKnownPositionAsync({
        timeInterval: 5000,
      });
      setLocation(location);
    })();
  }, []);

  //PUT request to addNew Participant to Rally /////MODIFY DATA[0] FOR LIST
  async function handleAddUser(newuser) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rallyName: data[0].rallyName,
        marker: data[0].marker,
        participants: [...data[0].participants, newuser],
      }),
    };
    const response = await fetch(
      "http://192.168.1.150:4077/update/" + data[0]._id,
      requestOptions
    );
    const addData = await response.json();
    setData(addData);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true} mapType="satellite">
        {otherUsers[0] &&
          otherUsers.map((person, index) => {
            return <Participant key={index} person={person} />;
          })}

        {data[0] && (
          <Marker //Render marker from fetched data
            title={"Rally Point"}
            pinColor="magenta"
            coordinate={
              data[0].marker || { latitude: 44.3874, longitude: 44.1686 }
            }
          />
        )}
      </MapView>
      <TextInput
        style={styles.input}
        placeholder={"name of new participant"}
        onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity
        style={styles.addUser}
        onPress={() => {
          handleAddUser({
            userId: name,
            latitude: location.latitude + 3,
            longitude: location.longitude + 2,
          });
        }}
      >
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {},

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
});

export default MeetingMapScreen;
