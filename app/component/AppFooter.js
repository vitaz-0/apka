import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class AppFooter extends Component {

  constructor(props) {
    super(props)
  }

  selectTab(tab){
    this.props.selectTab(tab);
  }

  render() {
    return(
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => this.selectTab("INFO")}>
          <View style={styles.footerLeft}>
            <Icon name='info' size={23}/>
                <Text>Info</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.selectTab("MAP")}>
          <View style={styles.footerRight}>
            <Icon name='map-o' size={23}/>
              <Text>Mapa</Text>
          </View>
        </TouchableOpacity>
      </View>
    )}
}
const styles = StyleSheet.create({
  footer: {
    height: 64,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    paddingTop: 6,
    paddingLeft: 6,
    paddingRight: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#a7a6ab',
    //elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flex: 0.5,
    alignItems: 'center',
  },
  footerRight: {
    flex: 0.5,
    alignItems: 'center',
  }
});

module.exports = AppFooter
