import React, {useState, useEffect} from 'react';
import AppButton from '../components/Button';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import * as ImagePicker from 'expo-image-picker';
import { DatePickerModal } from 'react-native-paper-dates'

import { StyleSheet, SafeAreaView, Platform, Picker, Image, ScrollView, View, Text } from "react-native";
import { Button } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import Screen from "../components/Screen";

const db = firebase.firestore();




function OrderSummary({navigation, route}){
  const out = async(image) => {
      const url = await firebasework(image)
      const res = await db.collection('Order').add({
        url: url
      }).then('Link added');
      
      // console.log('Added document with ID: ', res.id);
      console.log(fabricType);
      navigation.navigate('Billing', {id: res.id, date: date, selection: route.params.selection, email: email, fabricType: selectedValue})
  }
  const data = route.params;
  const email = data.email;
  const firebasework = async(uri) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("Orders/image"+Math.random());
    await ref.put(blob);
    const url = await ref.getDownloadURL().catch((error)=>console.log(error)).then()
    console.log(url)
    setFuck(url);
    console.log(email)
    return url;
  }
  const [fuck, setFuck] = useState('');
  const [selectedValue, setSelectedValue] = useState("Cotton");
        const [image, setImage] = useState(null);
        
        const [showDropDown, setShowDropDown] = useState(false);
        const [fabricType, setfabricType] = useState();
        const fabricTypeList = [
            { label: 'Cotton', value: 'cotton' },
            { label: 'Linen', value: 'linen' },
            { label: 'Polyster', value: 'polyster' },
            { label: 'Silk', value: 'silk' },
            { label: 'Khadi', value: 'khadi' },
        ];

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
            // result = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
            // });

            result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            // console.log(result);

            if (!result.cancelled) {
            setImage(result.uri);
            }
        };

        
        const [date, setDate] = React.useState("");
        const [open, setOpen] = React.useState(false);

        const onDismissSingle = React.useCallback(() => {
          setOpen(false);
        }, [setOpen]);

        const onConfirmSingle = React.useCallback(
          (params) => {
            setOpen(false);
            setDate(params.date);
          },
          [setOpen, setDate]
        );


    return (
    //   <ScrollView>
      <Screen style={styles.container}>
      
        <AppButton
        title="Order Summary"
        style={{ width: 200, height: 200, alignSelf:"center" }}
        />

        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick single date
        </Button>
        <DatePickerModal
          // locale={'en'} optional, default: automatic
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          // validRange={{
          //   startDate: new Date(2021, 1, 2),  // optional
          //   endDate: new Date(), // optional
          // }}
          // onChange={} // same props as onConfirm but triggered without confirmed by user
          // saveLabel="Save" // optional
          // label="Select date" // optional
          // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        />
        <AppButton title="Click Fabric Image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf:"center" }} />}

        

        {/* <AppButton  */}
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150, justifyContent: 'center', alignContent: 'center', textAlign: 'center', alignSelf: 'center' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Cotton" value="Cotton" />
        <Picker.Item label="Linen" value="Linen" />
        <Picker.Item label="Polyester" value="Polyester" />
        <Picker.Item label="Silk" value="Silk" />
        <Picker.Item label="Khadi" value="Khadi" />
      </Picker>

        
        <AppButton
      title="Next"
      style={{ width: 200, height: 200, alignSelf:"center" }}
      onPress={() => {
          const fireurl = out(image);
        }
      }
      />

      </Screen>
    //   </ScrollView>
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
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
});

export default OrderSummary;