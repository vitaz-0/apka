import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import InfoScreen from '../screens/InfoScreen';
import MapScreen from '../screens/MapScreen';
import AppHeader from '../component/AppHeader';

export default class TrailDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'INFO'
    }
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
      <View style={styles.container}>
        <AppHeader navigator={this.props.navigator} />
        <View style={styles.mainScreen}>
          <AppComponent trail={this.props.trail}/>
        </View>
        <View style={styles.footer}>

          <TouchableOpacity
            style={styles.footerItemContainer}
            onPress={() => this.setState({selectedTab: 'INFO'})}
            activeOpacity={1}
            >

            <View style={ this.state.selectedTab==='INFO' ? styles.footerItemPressed : styles.footerItem }>
              <Icon name='info' size={20}/>
              <Text style={styles.footerText}>Info</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerItemContainer}
            onPress={() => this.setState({selectedTab: 'MAP'})}
            activeOpacity={1}

          >
          <View style={ this.state.selectedTab==='MAP' ? styles.footerItemPressed : styles.footerItem }>
              <Icon name='map-o' size={20}/>
              <Text style={styles.footerText}>Mapa</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  mainScreen: {
    flex: 1,
    borderBottomColor: '#a7a6ab',
    borderBottomWidth: 0.5
  },
  footer: {
    flexDirection: 'row',
    height: 55,

    alignSelf: 'center',
    backgroundColor: '#f8f8f8',
  },
  footerItemContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  footerItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItemPressed: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ccebff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText:{
    fontSize: 11,
    alignItems: 'center',
  },
});

module.exports = TrailDetail
