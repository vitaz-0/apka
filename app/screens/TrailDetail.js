import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import InfoScreen from '../screens/InfoScreen';
import MapScreen from '../screens/MapScreen';
//import MapTest from '../screens/MapTest';
import AppHeader from '../component/AppHeader';
import AppFooter from '../component/AppFooter';

export default class TrailDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'INFO'
    }
  }

  _selectTab(tab){
    console.log("SELECT TAB");
    console.log(tab);
    this.setState({
      selectedTab: tab,
    });

  }

  render() {

    let AppComponent = null;

    //console.log("this.props.selectedTab: "+ this.state.selectedTab);

    if (this.state.selectedTab === 'INFO') {
      AppComponent = InfoScreen;
      //console.log("Selected AppComponent: " + AppComponent);
    } else if (this.state.selectedTab === 'MAP') {
      AppComponent = MapScreen;
      //console.log("Selected AppComponent: " + AppComponent);
    } else {
      //console.log("Selected AppComponent: ERROR");
    }

    return (
      <View style={styles.detailScreen}>

        <AppHeader />
        <AppComponent trailID={this.props.trailID} style={styles.detail}/>
        <AppFooter selectTab={this._selectTab.bind(this)}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailScreen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
    paddingTop: 10,
  }
});

module.exports = TrailDetail
