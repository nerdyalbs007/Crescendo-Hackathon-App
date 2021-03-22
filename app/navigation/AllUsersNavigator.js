import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AllAccountsScreen from '../screens/AllAccountsScreen';
import PersonDetailsScreen from "../screens/PersonDetailsScreen";
import editArmhole from '../screens/editArmhole';
import editLength from '../screens/editLength';
import editSleeves from '../screens/editSleeves';
import editStomach from '../screens/editSTomach';
import editShoulder from '../screens/editShoulder';
import KurtaTypeScreen from '../screens/KurtaTypeScreen'
import OrderSummary from "../screens/OrderSummary";
import Billing from "../screens/Billing";
const Stack = createStackNavigator();

function AllUsersNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={AllAccountsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="PersonDetails" component={PersonDetailsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="editArmhole" component={editArmhole} options={{headerShown: false}}/>
            <Stack.Screen name="editLength" component={editLength} options={{headerShown: false}}/>
            <Stack.Screen name="editSleeves" component={editSleeves} options={{headerShown: false}}/>
            <Stack.Screen name="editStomach" component={editStomach} options={{headerShown: false}}/>
            <Stack.Screen name="editShoulder" component={editShoulder} options={{headerShown: false}}/>  
            <Stack.Screen name="KurtaTypeScreen" component={KurtaTypeScreen} options={{headerShown:false}} />
            <Stack.Screen name="OrderSummary" component={OrderSummary} options={{headerShown:false}} />
            <Stack.Screen name="Billing" component={Billing} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

export default AllUsersNavigator;