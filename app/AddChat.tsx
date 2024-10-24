import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const AddChat = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  return (
    <View style={styles.container}>
      <View style={styles.inside}>
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={32} color={"#ffffff"} />
          </TouchableOpacity>
        </View>
      </View>
      <Text>AddChat</Text>
    </View>
  );
};

export default AddChat;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inside: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: "#3884fd",
    justifyContent: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
