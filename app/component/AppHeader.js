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

export default class AppHeader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
<View style={styles.header}>
    <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()} >
            <Icon name='chevron-left' size={16}/>
        </TouchableOpacity>
    </View>
    <View >
        <Text style={styles.headerBodyText}>Happy Tripper</Text>
    </View>
    <View style={styles.headerRight}>
      <Icon name='bars' size={16}/>

    </View>
</View>

  )}
}
const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 6,
    paddingRight: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#a7a6ab',
    //elevation: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBodyText: {
    fontSize: 18,
  },
  headerLeft: {
  //  fontSize: 20
  },
  headerRight: {
  //  fontSize: 20
  }
});

module.exports = AppHeader
