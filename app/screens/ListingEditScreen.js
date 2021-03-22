import React, {useEffect, useState} from "react";
import { StyleSheet, Platform, Image, ScrollView } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/Button';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const db = firebase.firestore();

const uploadImage = async(uri, UserEmail, values) =>{
  const response = await fetch(uri);
  const blob = await response.blob();
  // const { currentUser } = firebase.auth();
  var ref = firebase.storage().ref().child("Customer/"+UserEmail+"/image"+Math.random()+values.title);
  await ref.put(blob);

  // const url = await ref.getDownloadURL().catch((error)=>console.log(error));
  
  // return url;
}


const collectionwork = async(values, currentUser) =>{
  console.log(values);
  var docData = {
    email: values.email,
    age: values.age,
    address: values.address,
    name: values.name,
    contact: values.contact,

  };
  
  await db.collection('Customers').doc(docData.contact).set(docData).then(console.log('added'))
}

const firebasework = async(values, currentUser) =>{
  
  // const url = await uploadImage(image, currentUser, values)
  // .then()
  // .catch(error => console.log(error))

  await collectionwork(values, currentUser);  
  
  
}
const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("name"),
  age: Yup.number().required().min(1).max(10000).label("age"),
  address: Yup.string().label("address"),
  email: Yup.string().required().label("email"),
  contact: Yup.number().required().label('contact')
});



function ListingEditScreen({navigation}) {

  //This is picker
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  let result;
  const pickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  //This is end

  return (
    <ScrollView>
    <Screen style={styles.container}>
      <Form
        initialValues={{
          email: '',
          age: '',
          address: '',
          name: '',
          contact: '',
          
        }}
        onSubmit={async(values) => {
          
          const {currentUser} = await firebase.auth();
          await firebasework(values, currentUser.email);
          navigation.navigate("ChooseKurtaPyjama", {
              email: values.email  
          });
        }}
        // validationSchema={validationSchema}
      >

      {/* <AppButton title="Event Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf:"center" }} />} */}


        <FormField maxLength={255} name="name" placeholder="Customer Name" />

        <FormField maxLength={255} name="contact" placeholder="Contact" />

        <FormField maxLength={255} name="age" placeholder="Age" />

        <FormField maxLength={255} name="address" placeholder="Address" />

        <FormField maxLength={255} name="email" placeholder="Email" />


        <SubmitButton title="Next" />

      </Form>
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;