import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Icon from "../components/Icon";
import AppButton from "../components/Button";


import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

function ListingDetailsScreen({route}) {
  const listing = route.params;
  // const initialFetch = async () => {}
  useEffect(() => {
    console.log(listing);
  },[])

  const firebasefunction = async () => {

        db.collection("Order").doc(listing.id).update({
          
          "kurta.status": "Delayed"
      })
      .then(() => {
          console.log("Document successfully updated!");
      });
      console.log(listing.id);

  }
  const firebasefunction1 = async () => {

    db.collection("Order").doc(listing.id).update({
      
      "kurta.status": "Finished"
  })
  .then(() => {
      console.log("Document successfully updated!");
  });
  console.log(listing.id);

}

  return (
    <View>
      <Image style={styles.image} source={{uri:listing.uri}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>₹{listing.compensation}</Text>
        
        <AppButton title="Delay" onPress={firebasefunction}/>
        <AppButton title="Finished" onPress={firebasefunction1} />
        <AppButton title="Send Notification" onPress={console.log("Message Sent")} />

      
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  userContainer: {
    marginVertical: 40,
  },
  location:{
    marginTop: 20,
    marginBottom: 10
  },
  details:{
    marginTop: 5,
    marginBottom: 15
  },
  contact:{
    marginBottom: 10,
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 20
  },
  icon:{
    marginRight: '10',
  }
});

export default ListingDetailsScreen;
