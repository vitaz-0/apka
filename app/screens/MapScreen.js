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
    this.mapRef = null;

    this.state = {
      geoPoints: {
        boundaries:{},
        geoPoints: {
          points: [],
        },
      },
      region: {},
      padding: 0,
    }
    this.mapRef = null;
  }

  _hasRegion(){
    if(this.state.geoPoints.boundaries.hasOwnProperty('sw_lat')
      && this.state.geoPoints.boundaries.hasOwnProperty('sw_lng')
      && this.state.geoPoints.boundaries.hasOwnProperty('ne_lat')
      && this.state.geoPoints.boundaries.hasOwnProperty('ne_lng')
    ){
      return true;
    } else {
      console.log("WARNING: Trasa nema region. Using default. ");
      return false;
    }
  }

  listenForCoords(dataRef) {
    dataRef.on('value', (dataSnapshot) => {
      var coords = [];

      dataSnapshot.forEach((child) => {
        coords.push(child.val());
      });

      /* Kdyz chybi markery, nastav prazdnou hodnotu */
      if(!coords[0].hasOwnProperty('geoPoints') || !coords[0].geoPoints.hasOwnProperty('points')){
        console.log("WARNING: Trasa nema markery. ");
        coords[0].geoPoints.points = [];
      }

      this.setState({
        geoPoints: coords[0]
      });

      if(this._hasRegion()){
        this.mapRef.fitToCoordinates(
          [{latitude: this.state.geoPoints.boundaries.sw_lat, longitude: this.state.geoPoints.boundaries.sw_lng},
            {latitude: this.state.geoPoints.boundaries.ne_lat, longitude: this.state.geoPoints.boundaries.ne_lng}],
            { edgePadding: { top: 20, right: 20, bottom: 20, left: 20 }, animated: false }
        );}
    });
  }

  _getInitialRegion(){
    var sw_lng = 12.091389;
    var sw_lat = 48.5525;
    var ne_lng = 18.858889;
    var ne_lat = 51.055556;
    var region = {
        latitude:     (ne_lat + sw_lat)/2,
        longitude:    (ne_lng + sw_lng)/2,
        latitudeDelta: ne_lat - sw_lat + SPACE,
        longitudeDelta:ne_lng - sw_lng + SPACE,
    }
    return region;
  }

  componentDidMount() {
    console.log("Component did mount....");
    this.listenForCoords(this.dataRef);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <MapView style={styles.map}
        ref={(ref) => { this.mapRef = ref }}
      provider={PROVIDER_GOOGLE}
      initialRegion={this._getInitialRegion()}
      onRegionChange={this.onRegionChange.bind(this)}

      showsUserLocation={true}
      showsMyLocationButton={true}
      showsCompass={true}
      showsScale={true}
      zoomEnabled={true}
      loadingEnabled={true}

      >

      {
          this.state.geoPoints.geoPoints.points.map(marker => (
            <MapView.Marker
              key={marker.cislo}
              identifier={"MRK_"+marker.cislo}
              coordinate={marker.latLng}
              title={marker.nazev}/>))

      }
      </MapView>

    )
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 64,
    borderBottomColor: '#a7a6ab',
    borderBottomWidth: 0.5,
  },
});

module.exports = MapScreen
