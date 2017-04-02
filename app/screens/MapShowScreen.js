'use strict'
import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavigationBar from 'react-native-navbar'


var initState = {
      region: {
        latitude: 50.292325,
        longitude: 16.389759,
        latitudeDelta: 50.300068 - 50.292325,
        longitudeDelta: 16.443135 - 16.389759,
      }
}

var marklist = [
   {
    title: "A",
    latlng: {
      latitude: 50.299451,
      longitude: 16.443135
    }
    },
    {
      title: "B",
      latlng: {
        latitude: 50.297845,
        longitude: 16.411408
      }
    },
    {
      title: "C",
      latlng: {
        latitude: 50.292325,
        longitude: 16.389759
      }
    },
    {
      title: "D",
      latlng: {
        latitude: 50.300068,
        longitude: 16.397817
      }
    },
    {
     title: "E",
     latlng: {
       latitude: 50.299451,
       longitude: 16.443135
     }
     },
     {
       title: "F",
       latlng: {
         latitude: 50.297845,
         longitude: 16.411408
       }
     }
  ]

const mapStyle = []

class MapShowScreen extends Component {
  constructor(props) {
    super(props)
    this.state = initState
    this.state.markers = marklist
  }

  _onRegionChange(region) {
    this.setState({ region });
}

  render() {
    return (
      <ViewContainer >

        <StatusBarBackground style={{backgroundColor: "mistyrose"}} />

        <NavigationBar
          title={{ title: 'Detail trasy', tintColor: 'black', }}
          leftButton={{ title: '<', }}
          rightButton={{ title: 'Nastavení', }}
          style={{ backgroundColor: "white" }}
          statusBar={{ tintColor: "white", }}/>


        <MapView
          style={styles.mapview}
          region={this.state.region}
          onRegionChange={this._onRegionChange}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          
          showsScale={true}
          zoomEnabled={true}>


          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.title}
              coordinate={marker.latlng}
              title={marker.title}
            />
          ))}

      </MapView>

    </ViewContainer>

    )
  }
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    mapview: {
      position: 'absolute',
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

module.exports = MapShowScreen
