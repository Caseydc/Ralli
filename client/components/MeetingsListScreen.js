import React, { useState, useEffect } from "react";
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
import MeetingMapScreen from "./MeetingMapScreen";
import Rally from "./Rally";

//Here I will set the state of getRallies

const MeetingsListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // console.log(data);

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

  useEffect(() => {
    getRallies();
  }, []);

  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49,
          longitude: 4.6,
          latitudeDelta: 14,
          longitudeDelta: 5,
        }}
      >
        <Text style={styles.header}>Meetings</Text>
        <View style={styles.container}>
          {data[0] &&
            data.map((rally, index) => {
              return (
                <Rally style={styles.ral} key={index} rally={rally}></Rally>
              );
            })}
        </View>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },

  header: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
    fontWeight: "bold",
    margin: 13,
    opacity: 1,
  },

  ral: {
    ///
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
    opacity: 0.4,
    alignItems: "center",
  },

  container: {
    backgroundColor: `#f8f8ff`,
    padding: 15,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default MeetingsListScreen;
