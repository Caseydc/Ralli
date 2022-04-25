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
  Button,
  Pressable,
} from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
const HomeScreen = ({ navigation, route }) => {
  const { username } = route.params;
  // console.log(username);
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.title}>ralli</Text>
      </View>
      <View style={styles.buttonArea}>
        <View style={styles.topButtons}>
          <Pressable
            onPress={() => navigation.navigate("Form", { username: username })}
          >
            <Text style={styles.nav}>Create Meeting</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("MeetingsList")}>
            <Text style={styles.nav}>Meetings</Text>
          </Pressable>
        </View>
        <View style={styles.topButtons}>
          <Pressable
            onPress={() =>
              navigation.navigate("MeetingMap", { username: username })
            }
          >
            <Text style={styles.nav}>Meeting Map</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.nav}>Settings</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    backgroundColor: "#00BFFF",
    // flexDirection: "",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 58,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
  },

  logo: {
    alignItems: "center",
    position: "absolute",
    top: 100,
  },

  nav: {
    color: "white",
    margin: 15,
    fontSize: 22,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    padding: 6,
    borderColor: "white",
  },

  buttonArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: 400,
  },
});

export default HomeScreen;
