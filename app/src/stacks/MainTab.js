import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';

import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Appointments" component={Appointments} />
    <Tab.Screen name="Favorites" component={Favorites} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);
