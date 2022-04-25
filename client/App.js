import React, { useState } from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import FormScreen from "./components/FormScreen";
import MeetingMapScreen from "./components/MeetingMapScreen";
import MeetingsListScreen from "./components/MeetingsListScreen";
import SettingsScreen from "./components/SettingsScreen";
import ProfileScreen from "./components/ProfileScreen";
import LoginScreen from "./components/LoginScreen";
import Rally from "./components/Rally";
import LoginPromptScreen from "./components/LoginPromptScreen";
import Tabs from "./components/Tabs";
// import { createBottomTabNavigator } from '@react-navigation/'

const Stack = createNativeStackNavigator();

export default function App() {
  //States that will need to be changed
  // const [meeting, setMeeting] = useState(); //Modifying a meeting point
  // const [meetingList, setMeetingList] = useState([]); //Making a list of all meeting points
  // const [participants, setParticipants] = useState([]); //Keeping track of participants
  // //const [userLocation, setUserLocation] = useState([]); //Keeping track of the position of a participant.

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPrompt" component={LoginPromptScreen} />
        <Stack.Screen
          name="Login"
          options={{ header: () => null }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ header: () => null }}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Form"
          component={FormScreen}
        />
        <Stack.Screen name="MeetingMap" component={MeetingMapScreen} />
        <Stack.Screen name="MeetingsList" component={MeetingsListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Rally" component={Rally} />
      </Stack.Navigator>
      {/* <Tabs></Tabs> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: `#00ffff`,
  // },
});

//////////////////////////////////  Reference Code /////////////////////////////////////////
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// const [task, setTask] = useState();
// const [taskItems, setTaskItems] = useState([]);

// const handleAddTask = () => {
//   setTaskItems((prev) => [...prev, task]);
//   setTask(null);
// };

//   return (
//     <View style={styles.container}>
//       <View style={styles.tasksWrapper}>
//         <Text style={styles.sectionTitle}>Rallī</Text>
//         <View style={styles.item}>
//           {taskItems.map((item, index) => {
//             return <Task key={index} text={item} />;
//           })}
//         </View>
//       </View>

//       <KeyboardAvoidingView
//         behavior={(Platform.OS = "ios" ? "padding" : "height")}
//         style={styles.writeTaskWrapper}
//       >
//         <TextInput
//           style={styles.input}
//           placeholder={"Testing Placeholder"}
//           value={task}
//           onChangeText={(text) => setTask(text)}
//         />
//         <TouchableOpacity onPress={() => handleAddTask()}>
//           <View style={styles.addWrapper}>
//             <Text style={styles.addText}>+</Text>
//           </View>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: `#00ffff`,
//   },

//   tasksWrapper: {
//     paddingTop: 80,
//     paddingHorizontal: 20,
//   },

//   item: {
//     marginTop: 30,
//   },

//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },

//   writeTaskWrapper: {
//     position: "absolute",
//     bottom: 60,
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },

//   input: {
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     backgroundColor: `#e6e6fa`,
//     width: 250,
//     borderColor: `#778899`,
//     borderWidth: 1,
//     width: 250,
//     borderRadius: 25,
//   },

//   addWrapper: {
//     width: 60,
//     height: 60,
//     backgroundColor: "white",
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//   },

//   addText: {},
// });
