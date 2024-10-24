import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Chat = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoading, setisLoading] = useState(false);
  console.log("Logged User", user);

  const handleAddChat = ()=> {
    router.push("/AddChat");
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navbar}>
          <Image
            source={require("../assets/logo.png")}
            resizeMode="contain"
            style={styles.logo}
          />
          <TouchableOpacity style={styles.profile}>
            <FontAwesome5 name="user-alt" size={25} color={"#6c6d83"} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.mainChat}>
            <View style={styles.message}>
              <Text style={styles.title}>Messages</Text>
              <TouchableOpacity onPress={handleAddChat}>
                <Ionicons name="chatbox" size={28} color="#555"></Ionicons>
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <>
                <View>
                  <ActivityIndicator size={"large"} color={"#43C651"} />
                </View>
              </>
            ) : (
              <>
                <MessageCard />
                </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const MessageCard=()=>{
    return (
      <TouchableOpacity style={styles.message}>

        {/* IMAGE */}
        <TouchableOpacity style={styles.profile}>
          <MaterialIcons name="group" size={25} color={"#6c6d83"} />
        </TouchableOpacity>
        
        {/* CONTENT */}
        <View style={styles.Group}>
        <Text style={styles.textbox}>
         Message Title
        </Text>
        <Text style={styles.messageText}>
            Message Title
        </Text>
        </View>
      </TouchableOpacity>
    );
}
export default Chat;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  textbox:{
    color: "#333",
    fontWeight:"bold",
    textTransform: "capitalize",
    fontSize: 15,
  },
  messageText:{
    color:"#000",
    fontSize: 10,
  },
  safeArea: {
    flex: 1,
    width: "100%",
  },
  navbar: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff", 
  },
  logo: {
    height: 40, 
    width: 100, 
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
    paddingTop: 20,
  },
  mainChat: {
    width: width,
  },
  message: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontWeight:"bold",
    fontSize: 20,
  },
  Group: {
    flex:1,
    alignItems: "flex-start",
    justifyContent:"center",
    marginLeft : 10,
  },
});
