import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AppButton from '../components/Button';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const db = firebase.firestore();


function editStomach({route, navigation}){
    const person = route.params.p;
    const [number, onChangeNumber] = React.useState(null);
    const updateFirebase = async () => {
      await  db.collection("Data").doc(person).update({
            "kurta.stomach": number
        })
        .then(() => {
            console.log("Document successfully updated!");
        });
        
    }
    return (
        <View style={styles.screen}>
          <Text style={styles.screen}> Update Stomach Measurements </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter Updated Armhole size"
            keyboardType="numeric"
        />
        <AppButton 
            title='Update'
            onPress = {updateFirebase}
        />
        </View>
      );
}

const styles = StyleSheet.create({
    screen:{
        margin: 30,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    }
})

export default editStomach;
