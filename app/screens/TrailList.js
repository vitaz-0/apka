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

const SEARCHBAR_OFFSET = 40;

export default class TrailList extends Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      trailDataSource: ds.cloneWithRows(trailData.TRAIL_LIST.trails),
      showSearch: this.props.showSearch,
      listOffset: SEARCHBAR_OFFSET,
      scrolled: false,
    }
    console.log("props showSearch " + this.props.showSearch);
  }

  _renderView(trail){
    this.props.navigator.push({
      ident: "trailDetail",
      trail
    })
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
    return(<View key={`${sectionID}-${rowID}`} style={styles.separatorRow}/>)
  }

  toggleSearch(){
    console.log("tlist offset: " + this.state.listOffset);
    // console.log("showsearch: " + this.state.showSearch);
    if(this.state.listOffset < SEARCHBAR_OFFSET/2){
      this.refs.list_view.scrollTo({y:SEARCHBAR_OFFSET, animated: false});
      this.setState({
        showSearch: false
      });
    } else {
      this.refs.list_view.scrollTo({y:0, animated: false});
      this.setState({
        showSearch: true
      });
    }
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
    console.log("scrolled" + event.nativeEvent.contentOffset.y);
    this.state.listOffset = event.nativeEvent.contentOffset.y;


    // this.setState({
    //     showSearch : event.nativeEvent.contentOffset.y <= this.SEARCHBAR_OFFSET ? true: false
    //   });
  }

  // componentDidMount () {
  //     this.list_view.scrollTo({y: 100});
  //   }

  render() {
    return (
      <View>
{/* <TouchableOpacity onPress={this.refs.list_view.scrollTo({y: 0})}>
  <Text> xxxxxx
  </Text>
</TouchableOpacity> */}

        <AppHeader  navigator={this.props.navigator} toggleSearch={this.toggleSearch.bind(this)} ident={"LIST"}/>
      <ListView
            //style={{marginTop: 64}}
            ref='list_view'
            initialListSize={10}
            dataSource={this.state.trailDataSource}
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
