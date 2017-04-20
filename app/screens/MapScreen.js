'use strict'
import React, { Component } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'native-base';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';
//import MapView  from 'react-native-maps';

export default class MapScreen extends Component {
  constructor(props) {
    super(props)
  //  console.log(this.props.trail.b);

    this.state = {
      region: {},
      markers: []
    }

    this.state.region = {
        latitude: this.props.trail.boundaries.sw_lat,
        longitude: this.props.trail.boundaries.sw_lng,
        latitudeDelta: this.props.trail.boundaries.ne_lat - this.props.trail.boundaries.sw_lat,
        longitudeDelta: this.props.trail.boundaries.ne_lng - this.props.trail.boundaries.sw_lng,
      }
    this.state.markers = this.props.trail.geoPoints.points;

    console.log("MARKERS:");
    console.log(this.state.markers);

  }

  setInitialState(){
    this.setState(getInitialState());
  }

  onRegionChange(region) {
  this.setState({ region });
  console.log("region change");
  }
/*
showsMyLocationButton={true}
showsCompass={true}
showsScale={true}
zoomEnabled={true}
*/

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}



        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            style={styles.map}
            key={marker.cislo}
            coordinate={marker.latLng}
            title={marker.nazev}/>))}
      </MapView>
    </View>
    )}
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
   borderBottomColor: '#a7a6ab',
   borderBottomWidth: 0.5,
 },
 map: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   borderBottomColor: '#a7a6ab',
   borderBottomWidth: 0.5,
 },
});

module.exports = MapScreen
