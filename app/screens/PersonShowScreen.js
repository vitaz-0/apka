'use strict'
import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'

const people = [
  {firstName: "jordan", lastName: "leigh", roomNumber: 30},
  {firstName: "will", lastName: "piers", roomNumber: 14},
  {firstName: "berkeley", lastName: "wanner", roomNumber: 8}
]

class PersonShowScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      peopleDataSource: ds.cloneWithRows(people)
    }
  }

  render() {
    var personBackgroundColor
    switch(this.props.person.roomNumber) {
      case 30:
        personBackgroundColor = "coral"
        break
      case 14:
        personBackgroundColor = "skyblue"
        break
      case 8:
        personBackgroundColor = "lime"
        break
    }

    return (
      <ViewContainer style={{backgroundColor: personBackgroundColor}}>
        <StatusBarBackground style={{backgroundColor: "mistyrose"}} />

        <TouchableOpacity onPress={() => this.props.navigator.pop() }>
          <Icon name="times" size={30} />
        </TouchableOpacity>

        <ListView
          style={{marginTop: 100}}
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => { return this._renderPersonRow(person) }} />

        <Text style={{marginTop: 10, fontSize: 20}}>{`PERSON SHOW SCREEN`}</Text>
        <Text style={styles.personName}>{`${_.capitalize(this.props.person.firstName)} ${_.capitalize(this.props.person.lastName)}`}</Text>
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

module.exports = PersonShowScreen
