import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Platform,
  View,
  TouchableOpacity,
  Navigator,
  ListView,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import * as trailData from '../data/test/TrailListData';
import * as global from '../Global';

import TrailListIconPanel from '../component/TrailListIconPanel';
import AppHeader from '../component/AppHeader';

export default class TrailList extends Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      trailDataSource: ds.cloneWithRows(trailData.TRAIL_LIST.trails)
    }
  }

  _renderView(trail){
    console.log("Re Render the fucking view: xxxxxxx");
    this.props.navigator.push({
      ident: "trailDetail",
      trail
    })
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return(<View key={`${sectionID}-${rowID}`} style={styles.separatorRow}/>)
  }

  render() {

    return (
      <View>

        <AppHeader navigator={this.props.navigator}/>

        <ListView
            //style={{marginTop: 64}}
            initialListSize={10}
            dataSource={this.state.trailDataSource}
            renderRow={(trail) => { return this._renderTrailRow(trail) }}
            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)}

          />
      </View>
    )
  }

  _renderTrailRow(trail) {
  return (
    <TouchableOpacity style={styles.personRow} onPress={(event) => this._renderView(trail) }>

        <View style={styles.listItemLeft}>
          <Image  style={{width: 110, height: 100 }} source={{uri: global.APP_BASE_URL+'/app/data/test/photos/'+trail.trailPicture}}/>
        </View>

        <View style={styles.listItemRight}>
          <Text style={styles.trailName}>{trail.trailName}</Text>
          <TrailListIconPanel trail={trail} />
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../icon/distance3.png')}  style={{width: 23, height: 23}}/>
            <Text>{trail.trailDistance} km</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name="ios-flag-outline" style={{fontSize:25}}></Icon>
            <Text>{trail.trailStart}</Text>
            <Icon name="ios-flag" style={{fontSize:25}}></Icon>
            <Text>{trail.trailEnd}</Text>
          </View>
        </View>

    </TouchableOpacity>
  );}

}

const styles = StyleSheet.create({
  personRow: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 6,
  },
  listItemLeft: {
    width: 110,
    marginLeft: 6,
  },
  listItemRight: {
    paddingLeft: 10,
    flexDirection: 'column',
  },
  trailName: {
    fontSize: 18,
    marginLeft: 0,
  },
  separatorRow: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#a7a6ab',
}

});

module.exports = TrailList
