import React, {useState, useEffect} from 'react';
import AppButton from '../components/Button';


import { StyleSheet, Platform, Image, ScrollView, View, Text  } from "react-native";

import Screen from "../components/Screen";

// import MultipleChoice from "react-native-multiple-choice";
import MultiSelect from 'react-native-multiple-select';

function KurtaTypeScreen({navigation, route}){
    const email = route.params.email;
    // Data Source for the SearchableDropdown
    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
        // Set Selected Items
        setSelectedItems(selectedItems);
        console.log(selectedItems);
        console.log(email);
    };

    const items = [
        // name key is must. It is to show the text in front
        {id: 'Half Sleeve', name: 'Half Sleeve'},
        {id: 'Full Sleve - Normal', name: 'Full Sleve - Normal'},
        {id: 'Full Sleeve - Shirt sleeves', name: 'Full Sleeve - Shirt sleeves'},
        {id: 'KaliWala', name: 'KaliWala'},
        {id: 'Sabudana', name: 'Sabudana'},
        {id: 'Embroidery', name: 'Embroidery'},
        {id: 'Joghpuri', name: 'Joghpuri'},
        {id: 'Sherwani', name: 'Sherwani'},
        {id: 'Nehru Jacket', name: 'Nehru Jacket'},
    ];
    return (
      <ScrollView>
      <Screen style={styles.container}>
      {/* <View> */}
        {/* <Text> Hello working? </Text> */}

        <AppButton
        title="Kurtas"
        style={{ width: 200, height: 200, alignSelf:"center" }}
        />

        <View style={styles.container}>
            <Text style={styles.titleText}>
            Select Type Of Kurta
            </Text> 
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{color: '#CCC'}}
          submitButtonColor="#48d22b"
          submitButtonText="Submit"
        />
      </View>

      <AppButton
      title="Next"
      style={{ width: 200, height: 200, alignSelf:"center" }}
      onPress={() => navigation.navigate("OrderSummary", {selection: selectedItems, email: email})}
      />


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

export default KurtaTypeScreen;