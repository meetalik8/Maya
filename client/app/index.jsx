import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import React, { useLayoutEffect } from "react";
import useFonts from "@/hooks/useFonts";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import {doc, getDoc} from "firebase/firestore";
import {SET_USER} from "../context/actions/userActions";
import { useDispatch } from "react-redux";

const Index = () => {
  const fontsLoaded = useFonts();
  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
  checkLoggedUser();
  }, []);

  const checkLoggedUser = async()=> {
    firebaseAuth.onAuthStateChanged((userCred)=> {
      if(userCred?.uid){
        getDoc(doc(firestoreDB, "users", userCred?.uid)).then(
          (docSnap) => {
            if (docSnap.exists()) {
              console.log("User Data: ", docSnap.data());
              dispatch(SET_USER(docSnap.data()));
              
            }
          }).then(()=> {
            setTimeout(()=> {
              router.replace("Choice");
            }, )
          })
      } else {
        router.replace("Login")
      }
    })
  };
  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.container}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Maya</Text>
            <Text style={styles.subtitle}>
              Learn Indian Languages with fun!
            </Text>
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={() => router.push("/Signup")}
            containerStyles={styles.button}
          />
          {/* <ActivityIndicator size={"large"} color={"#f9a159"} /> */}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#3884fd",
  },
  logo: {
    width: 150,
    height: 84,
  },
  titleContainer: {
    marginTop: 20,
    position: "relative",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "NunitoBold",
  },
  subtitle: {
    fontSize: 24,
    color: "#f2d16a",
    textAlign: "center",
    fontWeight: "1000",
    fontFamily: "NunitoBold",
  },
  button: {
    width: "100%",
    marginTop: 28,
  },
});
export default Index;
