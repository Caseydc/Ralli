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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("str");
  const [password, setPassword] = useState("str");
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.input}
          placeholder={"Username"}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder={"password"}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.addUser}
        onPress={() => {
          navigation.navigate("Home", { username: username });
        }}
      >
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>Login</Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 41,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
    margin: 20,
  },

  input: {
    fontSize: 41,
    fontFamily: "Noteworthy",
    fontStyle: "italic",
  },
});

export default LoginScreen;
