import React, {useState, useEffect} from 'react';
import AppButton from '../components/Button';

import { StyleSheet, Platform, Image, ScrollView, View, Text ,TouchableOpacity, Alert } from "react-native";

import Screen from "../components/Screen";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
  } from "../components/forms";
import { set } from 'react-native-reanimated';
// import { firebase } from '@react-native-firebase/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

function Billing({navigation, route}) {
  const data = route.params;
  const fabricType = route.params["fabricType"];
  // const imageUri=route.params["url"];
  const emailId = route.params['email']
  const typeOfKurta = route.params['selection'];
  const dateString = route.params['date'];
  const [priceOverall, setPriceOverall]=useState("");
  const kurtaPrice=100;
  const id = route.params['id'];
  console.log(fabricType);
  
  console.log("Date: ", dateString);
  console.log('ID: ', id);

  const firebasework = async(values,email)=>{
    await db.collection("Order").doc(id).update({
        kurta:{
          quantity:  values['quantity'],
          status : "Pending",
          type:fabricType,
      },
      customer: emailId,
        tailor:email,
        date:dateString,
        totalPrice: values['price']*values['quantity']
    }).then(function() {
      console.log("Frank food updated");
    });

    await db.collection('Order').doc(id).update({
        
    }).then(console.log("Added Customer"));
    navigation.navigate('ViewPdf', {id: id});
    // console.log(imageUri);

};

return (
        
  <ScrollView>
  <Screen style={styles.container}>

    <AppButton
    title="Billing Sections (Kurta)"
    style={{ width: 200, height: 200, alignSelf:"center" }}
    //   onPress={}
    />

    <Form
    initialValues={{
      quantity: '',
      price: '',
      
    }}
    onSubmit={async(values) => {
        const {currentUser} = await firebase.auth();
        firebasework(values,currentUser.email);
        const quantityOrdered= values['quantity'];
        const pr = values['price']
        setPriceOverall(quantityOrdered*pr); 
      }}
    >


    <FormField maxLength={255} name="quantity" placeholder="Quantity" />
    <FormField maxLength={255} name="price" placeholder="Price Per Kurta" />

    <TouchableOpacity disabled={true}>
    <AppButton
    title={priceOverall}
    style={{ width: 200, height: 200, alignSelf:"center" }}
    />
    </TouchableOpacity>


    <SubmitButton title="Check Price"/>

  </Form>
  </Screen>
</ScrollView>
);
  }

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    titleText: {
      padding: 8,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    headingText: {
      padding: 8,
    },
  });

  export default Billing;
