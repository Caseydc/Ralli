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
import { Marker } from "react-native-maps";

//Used for iterating through and rendering each participant in a rally
const Participant = (props) => {
  // console.log(props);
  return (
    <View style={styles.container}>
      <Marker
        pinColor="green"
        title={props.person.userId} //Name of participant
        coordinate={{
          // Participant's location
          latitude: props.person.latitude,
          longitude: props.person.longitude,
        }}
      />
      {/* //for displaying name over participant */}
      {/* <Text>{props.person.userId}</Text> */}
      {/* </Marker> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {},
});

export default Participant;
