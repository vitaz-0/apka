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
        geoPoints: {},
      },
      region: {}
    }
    this.mapRef = null;
  }

  listenForCoords(dataRef) {
    dataRef.on('value', (dataSnapshot) => {
      var coords = [];
      dataSnapshot.forEach((child) => {
        coords.push(child.val());
      });
      this.setState({
        geoPoints: coords[0]
      });

      console.log("geopoints");
      console.log(this.state.geoPoints);
    });
  }

  _setCoords(){
    if(
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
    console.log("REGION");
    console.log(this.state.region);
  }

  componentDidMount() {
    this.listenForCoords(this.dataRef);
  }

  setInitialState(){
    this.setState(getInitialState());
  }

  onRegionChange(region) {
  this.setState({ region });
  //console.log("region change");
  }

  render() {
    this._setCoords();

    console.log("REGION RENDER");
    console.log(this.state.region);

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

      </MapView>
    </View>
    )}
  }

/*
{this.state.geoPoints.points.map(marker => (
  <MapView.Marker

    key={marker.cislo}
    identifier={"MRK_"+marker.cislo}
    coordinate={marker.latLng}
    title={marker.nazev}/>))}
*/

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
