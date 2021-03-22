import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import * as Yup from "yup";
// import { Button } from 'react-native-elements';



import AppButton from '../components/Button';
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { StyleSheet, Platform, ScrollView } from "react-native";

import Screen from "../components/Screen";
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

const validationSchema = Yup.object().shape({
    length: Yup.number().required().label('length'),
    shoulder: Yup.number().required().label('shoulder'),
    chest: Yup.number().required().label('chest'),
    stomach: Yup.number().required().label('stomach'),
    sleeves: Yup.number().required().label('sleeves'),
    armhole: Yup.number().required().label('armhole'),
  });
  const collectionwork = async(values, currentUser) =>{
    console.log(values);
    var docData = {
        length: values.length,
        shoulder: values.shoulder,
        chest: values.chest,
        stomach: values.stomach,
        sleeves: values.sleeves,
        armhole: values.armhole,
    };
    
    await db.collection('Data').doc(currentUser).set({
        kurta:{
            length: docData.length,
            shoulder: docData.shoulder,
            chest: docData.chest,
            stomach: docData.stomach,
            sleeves: docData.sleeves,
            armhole: docData.armhole,
        }
    }).then(console.log('added'))

    

  }
  
  const firebasework = async(values, currentUser) =>{
    console.log("Called"); 
    await collectionwork(values, currentUser);  
    
    
  }

function MeasurementScreen({navigation , route}){

  const [Length,setLength]=useState("Length");
  const [Shoulder,setShoulder]=useState("Shoulder");
  const [Chest,setChest]=useState("Chest");
  const [Stomach,setStomach]=useState("Stomach");
  const [Sleeves,setSleeves]=useState("Sleeves");
  const [ArmHole,setArmHole]=useState("setArmHole");
  


  const EngToHin= async()=>{
    setLength("लम्बाई");
    setShoulder("कन्धा");
    setChest("छाती");
    setStomach("पेट");
    setSleeves("बाहे");
    setArmHole("बुककया");
    
  };

  const HinToEng= async()=>{
    setLength("Length");
    setShoulder("Shoulder");
    setChest("Chest");
    setStomach("Stomach");
    setSleeves("Sleeves");
    setArmHole("Armhole");
    
  };

  const email = route.params.email;
        const buttonTextStyle = {
            color: '#393939'
        };

    return (
      <ScrollView>
      <Screen style={styles.container}>

        <Form
            initialValues={{
                length: '',
                shoulder: '',
                chest: '',
                stomach: '',
                sleeves: '',
                armhole: '',
              }}
              onSubmit={async(values) => {
          
                const {currentUser} = await firebase.auth();
                await firebasework(values, email);
                navigation.navigate("KurtaTypeScreen", {email: email})
                console.log(values)
                console.log(email)

                
              }}
              
        >
        <View style={{flex: 1}}>
            <ProgressSteps>
                <ProgressStep label="First" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <FormField maxLength={255} name="length" placeholder={Length} />
                    </View>
                </ProgressStep>
                <ProgressStep label="Second" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                    <FormField maxLength={255} name="shoulder" placeholder={Shoulder} />
                    </View>
                </ProgressStep>

                <ProgressStep label="Third" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                    <FormField maxLength={255} name="chest" placeholder={Chest} />
                    </View>
                </ProgressStep>

                <ProgressStep label="Fourth" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                    <FormField maxLength={255} name="stomach" placeholder={Stomach} />
                    </View>
                </ProgressStep>

                <ProgressStep label="Fifth" nextBtnTextStyle={buttonTextStyle} previousBtnTextStyle={buttonTextStyle}>
                    <View style={{ alignItems: 'center' }}>
                    <FormField maxLength={255} name="sleeves" placeholder={Sleeves} />
                    </View>
                </ProgressStep>

                <ProgressStep label="Sixth" >
                    <View style={{ alignItems: 'center' }}>
                    <FormField maxLength={255} name="armhole" placeholder={ArmHole} />
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>

                <AppButton
                  title="Change English to Hindi"
                  onPress={EngToHin}
                />

                <AppButton
                  title="Change Hindi to English"
                  onPress={HinToEng}
                />

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
  textst:{

  }
});

export default MeasurementScreen;