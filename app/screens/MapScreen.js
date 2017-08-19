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
    this.dataRef = firebaseApp.database().ref('/trails/trailGeo/geo').orderByChild("trailID").equalTo(this.props.trailID);

    this.state = {
      geoPoints: {
        boundaries:{},
        geoPoints: {
          points: [],
        },
      },
      region: {
        //latitude: 50.551747000000006,
        //latitudeDelta:0.04510200000000197,
        //longitude:16.0160125,
        //longitudeDelta: 0.07857899999999794
      }
    }
    this.mapRef = null;
  }

  listenForCoords(dataRef) {
    dataRef.on('value', (dataSnapshot) => {
      var coords = [];
      dataSnapshot.forEach((child) => {
        coords.push(child.val());
      });
      console.log("COORDS");
      console.log(coords);
      this.setState({
        geoPoints: coords[0]
      });
      console.log("LISTEN FOR COORDS, GEOPOINTS");
      console.log(this.state.geoPoints);
    });
  }

  _setRegion(){
    /*if(
      this.state.geoPoints.boundaries.hasOwnProperty('sw_lat')
      && this.state.geoPoints.boundaries.hasOwnProperty('sw_lng')
      && this.state.geoPoints.boundaries.hasOwnProperty('ne_lat')
      && this.state.geoPoints.boundaries.hasOwnProperty('ne_lng')
    ){
      var sw_lat = this.state.geoPoints.boundaries.sw_lat;
      var sw_lng = this.state.geoPoints.boundaries.sw_lng;
      var ne_lat = this.state.geoPoints.boundaries.ne_lat;
      var ne_lng = this.state.geoPoints.boundaries.ne_lng;
    } else {
      // DEFAULT FOR CZECH REPUBLIC
      console.log("Using default boundaries");
      var sw_lng = 12.091389;
      var sw_lat = 48.5525;
      var ne_lng = 18.858889;
      var ne_lat = 51.055556;
    }
    */

    var sw_lat = this.state.geoPoints.boundaries.sw_lat;
    var sw_lng = this.state.geoPoints.boundaries.sw_lng;
    var ne_lat = this.state.geoPoints.boundaries.ne_lat;
    var ne_lng = this.state.geoPoints.boundaries.ne_lng;

    this.state.region = {
        latitude:     (ne_lat + sw_lat)/2,
        longitude:    (ne_lng + sw_lng)/2,
        latitudeDelta: ne_lat - sw_lat + SPACE,
        longitudeDelta:ne_lng - sw_lng + SPACE,
    }

    console.log("SET COORDS, REGION");
    console.log(this.state.region);

  }


  componentDidMount() {
    console.log("Component will mount....");
    this.listenForCoords(this.dataRef);
  }

  onRegionChange(region) {
  this.setState({ region });
  //console.log("region change");
  }

  render() {
    this._setRegion();

    return (
      <MapView style={styles.map}


      provider={PROVIDER_GOOGLE}
      initialRegion={this.state.region}
      onRegionChange={this.onRegionChange.bind(this)}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
      zoomEnabled={true}
      >
      {this.state.geoPoints.geoPoints.points.map(marker => (
        <MapView.Marker
          key={marker.cislo}
          identifier={"MRK_"+marker.cislo}
          coordinate={marker.latLng}
          title={marker.nazev}/>))}
      </MapView>

    )}
  }

  const styles = StyleSheet.create({

 map: {
   position: 'absolute',
   top: 64,
   left: 0,
   right: 0,
   bottom: 0,
   borderBottomColor: '#a7a6ab',
   borderBottomWidth: 0.5,
 },
});

module.exports = MapScreen
