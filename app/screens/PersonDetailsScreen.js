import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList, ScrollView } from "react-native";

import colors from "../config/colors";
import Text from "../components/Text";
import Icon from "../components/Icon";
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import AppButton from "../components/Button";
import { ListItem, ListItemSeparator } from "../components/lists";

const db = firebase.firestore();


function ListingDetailsScreen({navigation, route}) {
  const person = route.params;
  const [data, setData] = useState(null);
  const d = [];
  const firebasework = async () => {
    await db.collection('Data').doc(person.email).get().then(async (doc) => {
      await setData(doc.data());
      console.log(doc.data());
      console.log(data);
    })
  }
  useEffect(() => {
    firebasework();
    console.log(data);
  }, [])

  const editArmhole = () => {
      navigation.navigate('editArmhole', {p: person.email});
      // firebasework();
  }
  const editSleeves = () => {
    navigation.navigate('editSleeves', {p: person.email});
  }
  const editLength = () => {
    navigation.navigate('editLength', {p: person.email});
  }
  const editChest = () => {
    navigation.navigate('editChest', {p: person.email});
  }

  const editStomach = () => {
    navigation.navigate('editStomach', {p: person.email});
  }
  const editShoulder = () => {
    navigation.navigate('editShoulder', {p: person.email});
  }
  const funny = () => {
    navigation.navigate('KurtaTypeScreen', {
      email:person.email
    })
  }
  return (
    <ScrollView>
      {/* <Image style={styles.image} source={{uri:person.uri}} /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{person.name}</Text>
        <Text style={styles.location}>Age:                           {person.age}</Text>
        <Text style={styles.details}>Contact Number: {person.contact}</Text>
        <Text style={styles.contact}>Email ID:  {person.email}</Text>  
        <Text style={styles.contact}>Kurta Details: </Text>        
      </View> 
      <View>
        {data && <ListItem 
        title="Stomach"
        subTitle= {data['kurta'].stomach}
        onPress = {editStomach}
        />}
        {data && <ListItem 
        title="Shoulder"
        subTitle= {data['kurta'].shoulder}
        onPress = {editShoulder}
        />}
        {data && <ListItem 
        title="Sleeves"
        subTitle= {data['kurta'].sleeves}
        onPress = {editSleeves}
        />}
        {data && <ListItem 
        title="Chest"
        subTitle= {data['kurta'].chest}
        onPress = {editChest}
        />}
       {data && <ListItem 
        title="armhole"
        subTitle= {data['kurta'].armhole}
        onPress = {editArmhole}
        />}
                
        {data && <ListItem 
        title="Length"
        subTitle= {data['kurta'].length}
        onPress={editLength}
        /> }
        
          <AppButton  title="Make a quick order with same Measurements"
                    onPress = {funny}
          />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    margin: 30,
  },
  image: {
    width: "100%",
    height: 300,
  },
  location: {
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
    marginBottom: 30,
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 20
  },
  icon:{
    marginRight: '10',
  }
});

export default ListingDetailsScreen;