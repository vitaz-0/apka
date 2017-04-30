'use strict'
import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text} from 'native-base';
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';
//import MapView  from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const SPACE = 0.01;

export default class MapScreen extends Component {
  constructor(props) {
    super(props)
  //  console.log(this.props.trail.b);

    this.state = {
      region: {},
      markers: []
    }

    if(this.props.trail.boundaries.hasOwnProperty('sw_lat')){
      var sw_lat = this.props.trail.boundaries.sw_lat;
      var sw_lng = this.props.trail.boundaries.sw_lng;
      var ne_lat = this.props.trail.boundaries.ne_lat;
      var ne_lng = this.props.trail.boundaries.ne_lng;
    } else {
      // DEFAULT FOR CZECH REPUBLIC
      var sw_lng = 12.091389;
      var sw_lat = 48.5525;
      var ne_lng = 18.858889;
      var ne_lat = 51.055556;
    }

    this.state.region = {
        latitude:     (ne_lat + sw_lat)/2,
        longitude:    (ne_lng + sw_lng)/2,
        latitudeDelta: ne_lat - sw_lat + SPACE,
        longitudeDelta:ne_lng - sw_lng + SPACE,
    }
/*
      console.log("LAT_SW: " + this.state.region.latitude);
      console.log("LON_SW: " + this.state.region.longitude);

      console.log("LAT_NE: " + this.props.trail.boundaries.ne_lat);
      console.log("LON_NE: " + this.props.trail.boundaries.ne_lng);

      console.log("LAT_DELTA: " + this.state.region.latitudeDelta);
      console.log("LON_DELTA: " + this.state.region.longitudeDelta);
*/
    this.state.markers = this.props.trail.geoPoints.points;
    this.mapRef = null;

    /*
    var s  = [];
    for (var mrk = 0; mrk < this.state.markers.length; mrk ++) {
        s.push(this.state.markers[mrk].latLng);
        console.log(this.state.markers[mrk].id);
    }
    this.latLngArray = s;
    */
  }

  setInitialState(){
    this.setState(getInitialState());
  }

  onRegionChange(region) {
  this.setState({ region });
  //console.log("region change");
  }

  /*
  componentDidMount() {
    console.log("caled: ComponentidMount");
    console.log(this.mapRef);
    this.mapRef.fitToSuppliedMarkers(
      ["MRK_1","MRK_2","MRK_3","MRK_4","MRK_5"],
      false, // not animated
    );
  }
  */

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        //ref={(ref) => { this.mapRef = ref }}
        //onLayout = {() => this.mapRef.fitToCoordinates(this.latLngArray, { edgePadding: { top: 20, right: 20, bottom: 20, left: 20 }, animated: false })}

        provider={PROVIDER_GOOGLE}
        initialRegion={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        zoomEnabled={true}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker

              key={marker.cislo}
              identifier={"MRK_"+marker.cislo}
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
