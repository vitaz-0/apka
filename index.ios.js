import NavigationBar from 'react-native-navbar'
import AppNavigator from './app/navigation/AppNavigator'
import Icon from 'react-native-vector-icons/FontAwesome'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TabBarIOS
} from 'react-native';

export default class happyTripper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "DETAIL"
    }
  }

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "DETAIL"}
          title={`Info`}
          iconName="info"
          onPress={() => this.setState({selectedTab: "DETAIL"})}>
          <AppNavigator
            initialRoute={{ident: "PeopleIndex"}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "PERSON"}
          title={`Detail`}
          iconName="user"
          onPress={() => this.setState({selectedTab: "PERSON"})}>
           <AppNavigator
            initialRoute={{ident: "PersonShow",
                           person: {firstName: "jordan", lastName: "leigh", roomNumber: 30}}} />
        </Icon.TabBarItemIOS>

        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === "MAP"}
          title={`Mapa`}
          iconName="map-o"
          onPress={() => this.setState({selectedTab: "MAP"})}>
           <AppNavigator
            initialRoute={{ident: "MapShow"}} />
        </Icon.TabBarItemIOS>

      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('happyTripper', () => happyTripper);
