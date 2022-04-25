import React, { useEffect, useState } from "react";
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

const SettingsScreen = ({ navigation }) => {
  const [mapMode, setMapMode] = useState("standard");
  const [displayUser, setDisplayUser] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },

  title: {
    alignItems: "center",
  },
});

export default SettingsScreen;
