import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from './navigationComponents/TabBarComponent';
import HomeScreen from '../screens/Home/HomeScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';
import LocationScreen from '../screens/Location/LocationScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import EditProfileScreen from '../screens/Account/EditProfileScreen';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}



const OrdersStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}

const AccountStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        </Stack.Navigator>
    )
}

const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}

const LocationStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LocationScreen" component={LocationScreen} />
        </Stack.Navigator>
    )
}



const TabScreen = ({ navigation }: any) => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props: any) => <MyTabBar {...props} />} >
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",

                }} />
            <Tab.Screen
                name="OrdersStack"
                component={OrdersStack}
                options={{
                    tabBarLabel: "Orders",
                }} />


            <Tab.Screen
                name="AccountStack"
                component={AccountStack}
                options={{
                    tabBarLabel: "Account",
                }} />

            <Tab.Screen
                name="LoginStack"
                component={LoginStack}
                options={{
                    tabBarLabel: "Login",
                }} />

            <Tab.Screen
                name="LocationStack"
                component={LocationStack}
                options={{
                    tabBarLabel: "Location",
                }} />

        </Tab.Navigator>
    )
}

export default TabScreen;


