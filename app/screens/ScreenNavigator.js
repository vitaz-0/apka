import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} from 'react-native';

import TrailList from './TrailList';
import TrailDetail from './TrailDetail';

export default class ScreenNavigator extends Component {

  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

  switch(route.ident) {
      case "trailList":
        return (
          <TrailList
            {...globalNavigatorProps}
            showSearch={false}
          />
      )

      case "trailListSearch":
        return (
          <TrailList
            {...globalNavigatorProps}
            showSearch={true}
          />
      )

      case "trailDetail":
        return (
          <TrailDetail
            {...globalNavigatorProps}
            trail={route.trail} />
        )

      default:
        return (
          <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
        )
    }
  }

  render(){
    return (
    <Navigator
      initialRoute={this.props.initialRoute}
      ref="screenNavigator"
      renderScene={this._renderScene}
      configureScene={(route) => ({
        ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    );
  }
}

module.exports = ScreenNavigator
