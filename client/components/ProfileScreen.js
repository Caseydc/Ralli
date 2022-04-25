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

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Your Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {},
});

export default ProfileScreen;
