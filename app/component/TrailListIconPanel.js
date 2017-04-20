import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Icon } from 'native-base';

export default class TrailListIconPanel extends Component {

  constructor(props) {
    super(props)
  }

  _renderHike(){
    if(this.props.trail.trailHike === true){
      return (<Icon name="ios-walk-outline" style={{fontSize:25,  marginRight: 3}}/>);
    }
  }

  _renderCyclo(){
    if(this.props.trail.trailCyklo === true){
      return (<Icon name="ios-bicycle-outline" style={{fontSize:25, marginRight: 3}}/>);
    }
  }

  _renderSki(){
    if(this.props.trail.trailSki === true){
      return(<Image source={require("../icon/ski.png")}  style={{width: 20, height: 20, marginTop: 2}}/>);
    }
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this._renderHike()}
        {this._renderCyclo()}
        {this._renderSki()}
      </View>

    )}

}

const styles = StyleSheet.create({

});

module.exports = TrailListIconPanel
