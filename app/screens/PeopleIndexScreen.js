'use strict'
import React, { Component } from 'react';

import {
    Text,
    View,
    ListView,
    TouchableOpacity,
    Navigator,
    StyleSheet
} from 'react-native'

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from 'react-native-navbar'

const people = [
  {firstName: "jordan", lastName: "leigh", roomNumber: 30},
  {firstName: "will", lastName: "piers", roomNumber: 14},
  {firstName: "berkeley", lastName: "wanner", roomNumber: 8}
]

class PeopleIndexScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      peopleDataSource: ds.cloneWithRows(people)
    }
  }

  render() {
    return (
      <ViewContainer>

          <StatusBarBackground style={{backgroundColor: "mistyrose"}} />


          <NavigationBar
               title={{ title: 'Detail trasy', tintColor: 'black', }}
               leftButton={{ title: '<', }}
               rightButton={{ title: 'Nastavení', }}
               style={{ backgroundColor: "white" }}
               statusBar={{ tintColor: "white", }}/>




        <ListView
          style={{marginTop: 0}}
          initialListSize={10}
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => { return this._renderPersonRow(person) }} />
      </ViewContainer>
    )
  }

  _renderPersonRow(person) {
    return (
      <TouchableOpacity style={styles.personRow} onPress={(event) => this._navigateToPersonShow(person) }>
        <Text style={styles.personName}>{`${_.capitalize(person.firstName)} ${_.capitalize(person.lastName)}`}</Text>
        <View style={{flex: 1}} />
        <Icon name="chevron-right" size={10} style={styles.personMoreIcon} />
      </TouchableOpacity>
    )
  }

  _navigateToPersonShow(person) {
    this.props.navigator.push({
      ident: "PersonShow",
      person
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  navbar: {
    flex: 1,
  },

  personRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50
  },

  personName: {
    marginLeft: 25
  },

  personMoreIcon: {
    color: "green",
    height: 10,
    width: 10,
    marginRight: 25
  }

});

module.exports = PeopleIndexScreen
