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
  Pressable,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("str");
  const [password, setPassword] = useState("str");
  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder={"Login"}
        onChangeText={(text) => setUsername(text)}
      /> */}
      <Pressable
        style={styles.press}
        onPress={() => {
          navigation.navigate("Login", { username: username });
        }}
      >
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>Login</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.press}
        onPress={() => {
          navigation.navigate("Login", { username: username });
        }}
      >
        <View style={styles.addWrapper}>
          <Text style={styles.newUser}>Create Account</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {},

  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  login: {
    fontSize: 49,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
  },

  addText: {
    fontSize: 49,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
  },
});

export default LoginScreen;
