import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, View, Icon} from 'native-base';

//import Icon from 'react-native-vector-icons/FontAwesome';

//import InfoScreen from './app/screens/InfoScreen';
import MapScreen from './app/screens/MapScreen';

//import TrailDetail from './app/screens/TrailDetail';
//import TrailList from './app/screens/TrailList';
//import Test from './app/screens/default';
import ScreenNavigator from './app/screens/ScreenNavigator';

export default class happyTripper extends Component {
  render() {
    return (
      <ScreenNavigator initialRoute={{ident: "trailList"}} />
        //<Test/>
        //<TrailDetail />
//<MapScreen/>
    );
  }
}


AppRegistry.registerComponent('happyTripper', () => happyTripper);
