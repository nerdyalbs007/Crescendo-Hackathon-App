import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListingEditScreen from "../screens/ListingEditScreen";
import ChooseKurtaPyjama from '../screens/ChooseKurtaPyjama';

import MeasurementScreen from "../screens/MeasurementScreen";
// import KurtaTypeScreen from "../screens/KurtaTypeScreen;"
import KurtaTypeScreen from "../screens/KurtaTypeScreen";
import OrderSummary from "../screens/OrderSummary";
import Billing from "../screens/Billing";
import ViewPdf from "../screens/ViewPdf";

const Stack = createStackNavigator();

function ListingEditNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListingEdit" component={ListingEditScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ChooseKurtaPyjama" component={ChooseKurtaPyjama} options={{headerShown:false}} />
            <Stack.Screen name="MeasurementScreen" component={MeasurementScreen} options={{headerShown:false}} />
            <Stack.Screen name="KurtaTypeScreen" component={KurtaTypeScreen} options={{headerShown:false}} />
            <Stack.Screen name="OrderSummary" component={OrderSummary} options={{headerShown:false}} />
            <Stack.Screen name="Billing" component={Billing} options={{headerShown:false}} />
            <Stack.Screen name="ViewPdf" component={ViewPdf} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default ListingEditNavigator;