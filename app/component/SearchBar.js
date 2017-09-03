import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchBar extends Component {
/*
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
UZ SE NEPOUZIVA
- pouzij react-native-search-box
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/
  constructor(props) {
    super(props);
  }

  _setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
  }

  render() {
/*
return(
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBarLeft}>
        <Icon name='ios-search' style={styles.searchBarLeftIcon} size={20}/>
        <TextInput
          style={styles.searchBarLeftText}
          value={'Hello'}
        />
        <TouchableOpacity>
        <Icon name='ios-close-circle' style={styles.searchBarLeftIcon} size={20} />
    </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.searchBarRight}>
      <Text style={styles.searchBarRightText} onPress={() => this.props.cancelSearch()}>
        Cancel
      </Text>
    </TouchableOpacity>
    </View>
  )
  */
    return(
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarLeft}>
          <Icon name='ios-search' style={styles.searchBarLeftIcon} size={20}/>

          <TextInput
            style={styles.searchBarLeftText}
            //value={this.state.searchText}
            //onChange={this._setSearchText.bind(this)}
            onChangeText={(text) => this.setState({text})}
            placeholder="Search"
            //value={'Hello'}
          />


          <TouchableOpacity>
            <Icon name='ios-close-circle' style={styles.searchBarLeftIcon} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchBarRight}>
          <Text style={styles.searchBarRightText} onPress={() => this.props.cancelSearch()}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    borderBottomWidth: 0.5,
    borderBottomColor: '#a7a6ab',
    justifyContent: 'space-between',
  },
  searchBarLeft: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 26,
    marginLeft: 6,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    //flex: .1,
    //borderWidth: 9,

  },
  searchBarLeftText: {
    //flex: 7,
    //paddingLeft: 30,
    fontSize: 18,
    flex: 1,
    //backgroundColor: '#ededed',
  },
  searchBarLeftIcon: {
    //flex: 7,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#CDCDCD',

  },
  searchBarRight: {
    flex: 2,

  },
  searchBarRightText: {
    fontSize: 18,
    alignSelf: 'center',
    //paddingLeft: 5,
  },
})

module.exports = SearchBar
