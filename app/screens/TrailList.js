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
  ScrollView,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import * as trailData from '../data/test/TrailListData';
import * as global from '../Global';
import TrailListIconPanel from '../component/TrailListIconPanel';
import AppHeader from '../component/AppHeader';
import SearchBar from '../component/SearchBar';

import firebaseConfig from '../data/firebaseConfig';

const SEARCHBAR_OFFSET = 40;

export default class TrailList extends Component {

  constructor(props) {
    super(props)
    this.dataRef = firebaseApp.database().ref('/trails/trailList/list');
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      //dataSource: dataSource.cloneWithRows(trailData.TRAIL_LIST.trails),
      dataSource: dataSource,
      showSearch: this.props.showSearch,
      listOffset: this.props.showSearch ? 0 : SEARCHBAR_OFFSET,
      scrolled: false,
    }
  }

  listenForTrails(dataRef) {
  dataRef.on('value', (dataSnapshot) => {
    var trails = [];
    dataSnapshot.forEach((child) => {
      trails.push({
        trailItem: child.val(),
        _key: child.key
      });
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(trails)
    });
  });
  }

  componentDidMount() {
    // start listening for firebase updates\
    this.listenForTrails(this.dataRef);
  }

  _renderView(trailID){
    this.props.navigator.push({
      ident: "trailDetail",
      trailID
    })
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return(<View key={`${sectionID}-${rowID}`} style={styles.separatorRow}/>)
  }

  toggleSearch(){
    console.log("TOGGLE SEARCH");
    console.log("tlist offset: " + this.state.listOffset);

    if(this.state.listOffset < SEARCHBAR_OFFSET/2){
      this.refs.list_view.scrollTo({y:SEARCHBAR_OFFSET, animated: false});
      this.setState({
        showSearch: false,
        listOffset: SEARCHBAR_OFFSET
      });
    } else {
      this.refs.list_view.scrollTo({y:0, animated: false});
      this.setState({
        showSearch: true,
        listOffset: 0
      });
    }
    console.log("showsearch: " + this.state.showSearch);
  }

  cancelSearch(){
    this.refs.list_view.scrollTo({y:SEARCHBAR_OFFSET, animated: false});
  }

  _renderListHeader(){
      return (
        <SearchBar toggleSearch={this.toggleSearch.bind(this)} cancelSearch={this.cancelSearch.bind(this)}/>
      )
  }

  _getInitialOffset(){
    if(this.state.showSearch === false){
        return ({ x: 0, y: SEARCHBAR_OFFSET});
    } else {
      return ({ x: 0, y: 0});
    }
  }

  _onScroll(event){
    this.state.listOffset = event.nativeEvent.contentOffset.y;
  }

  render() {
    return (
      <View>
        <AppHeader  navigator={this.props.navigator} toggleSearch={this.toggleSearch.bind(this)} ident={"LIST"}/>
      <ListView
            //style={{marginTop: 64}}
            ref='list_view'
            initialListSize={10}
            dataSource={this.state.dataSource}
            renderRow={(trail) => { return this._renderTrailRow(trail) }}
            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
            renderHeader={() => this._renderListHeader()}
            onScroll={(event) => this._onScroll(event)}
            scrollEventThrottle={500}
            contentOffset={this._getInitialOffset()}
          />
      </View>
    )
  }

  _renderTrailRow(trail) {
  return (
    <TouchableOpacity style={styles.personRow} onPress={(event) => this._renderView(trail.trailItem.trailID) }>

        <View style={styles.listItemLeft}>
          <Image  style={{width: 110, height: 100 }} source={{uri: global.APP_BASE_URL+'/app/data/test/photos/'+trail.trailItem.trailPicture}}/>
        </View>

        <View style={styles.listItemRight}>
          <Text style={styles.trailName}>{trail.trailItem.trailName}</Text>
        <TrailListIconPanel trail={trail.trailItem} />
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../icon/distance3.png')}  style={{width: 23, height: 23}}/>
            <Text>{trail.trailItem.trailDistance} km</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name="ios-flag-outline" style={{fontSize:25}}></Icon>
            <Text>{trail.trailItem.trailStart}</Text>
            <Icon name="ios-flag" style={{fontSize:25}}></Icon>
            <Text>{trail.trailItem.trailEnd}</Text>
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
