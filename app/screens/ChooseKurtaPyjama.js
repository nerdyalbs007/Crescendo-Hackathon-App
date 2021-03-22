import React, { Component } from 'react';
import AppButton from '../components/Button';


import { StyleSheet, Platform, Image, ScrollView } from "react-native";

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import Screen from "../components/Screen";



function ChooseKurtaPyjama({navigation,route}){
    const email = route.params;
    return (
      <ScrollView>
      <Screen style={styles.container}>
      {/* <View> */}
        {/* <Text> Hello working? </Text> */}

        <AppButton
        title="Kurtas"
        style={{ width: 200, height: 200, alignSelf:"center" }}
        onPress={() => navigation.navigate("MeasurementScreen", email)}
        />

        <AppButton
        title="Pyjamas"
        style={{ width: 200, height: 200, alignSelf:"center" }}
        />

        <AppButton 
        title="Kurta and Pyjama"
        style={{ width: 200, height: 200, alignSelf:"center" }}
        />

      {/* <Button mode="contained">
      Kurta
      </Button>

      <Button mode="contained">
        Pyjama
      </Button>  */}

      {/* <Button mode="contained">
        KurtaandPyjama
      </Button> */}

      {/* </View> */}

      </Screen>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ChooseKurtaPyjama;

