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
import MeetingMapScreen from "./MeetingMapScreen";

//Used for iterating through and rendering each participant in a rally
const Rally = (props, { navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("MeetingMap");
          return <MeetingMapScreen />;
        }}
        style={styles.press}
      >
        <Text style={styles.title}>{props.rally.rallyName}</Text>
        <Text style={styles.author}>{props.rally.participants[0].userId}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },

  title: {
    color: "black",
    fontSize: 30,
  },
});

export default Rally;
