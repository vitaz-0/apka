
import React, { Component } from 'react';

import {Container, Content, Text} from 'native-base';

import {View, Navigator} from 'react-native';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props)
    console.log("props TRAIL iD");
    console.log(this.props.trailID);
    this.dataRef = firebaseApp.database().ref('/trails/trailDetail/detail').orderByChild("trailID").equalTo(this.props.trailID);
    //this.dataRef = firebaseApp.database().ref('/trails');
  }

  listenForDetails(dataRef) {
  dataRef.on('value', (dataSnapshot) => {

    dataSnapshot.forEach((child) => {
      this.state.detailItem = child.val();
    //  details._key = child.key;

    });

    console.log("DETAIL ITEM");
    console.log(this.state.detailItem);
  /*
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(details)
    });
  */
  });
  }

  componentDidMount() {
    // start listening for firebase updates\
    this.listenForDetails(this.dataRef);
  }

render(){
return(
<View>
<Text>
  Fucking info screen
</Text>
<Text>
some text

</Text>
</View>
)
}


  }

module.exports = InfoScreen
