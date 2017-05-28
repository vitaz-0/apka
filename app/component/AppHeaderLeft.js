import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class AppHeader extends Component {

  constructor(props) {
    super(props)
  }

  _searchButtonOnPress(){
    console.log("IDENT " + this.props.ident);
    if(this.props.ident === "LIST"){
      this.props.toggleSearch();
    } else if(this.props.ident === "DETAIL"){

    /*  this.props.navigator.push({
        ident: "trailListSearch"
      })*/

      this.props.navigator.pop()
    }
  }

  render() {
    return(
  <View style={styles.header}>
    <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.headerLeftArrowBack} onPress={() => this.props.navigator.pop()} >
            <Icon name='ios-arrow-back' size={23}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._searchButtonOnPress()}>
            <Icon name='ios-search' size={23}/>
        </TouchableOpacity>
    </View>
    <View >
        <Text style={styles.headerBodyText}>Happy Tripper</Text>
    </View>
    <View style={styles.headerRight}>
      <Icon name='ios-menu' size={23}/>
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
    flexDirection: 'row',
  //  fontSize: 20
  },
  headerLeftArrowBack: {
    marginRight: 10,
  },
  headerRight: {
  //  fontSize: 20
  }
});

module.exports = AppHeader
