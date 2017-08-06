
import React, { Component } from 'react';

import {Container, Content, Text} from 'native-base';

import {View, Navigator} from 'react-native';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props)
    this.dataRef = firebaseApp.database().ref('/trails/trailDetail/detail').orderByChild("trailID").equalTo(this.props.trailID);
    this.state = {
      trailDetail: "",
    }
  }

  listenForDetails(dataRef) {
    dataRef.on('value', (dataSnapshot) => {
      var details = [];
      dataSnapshot.forEach((child) => {
        details.push(child.val());
      });
      this.setState({
        trailDetail: details[0]
      });
      //console.log("trail detail0 ");
      //console.log(details[0]);
      //console.log("trail detail1 ");
      //console.log(this.state.trailDetail);
    });
  }

  componentDidMount() {
    this.listenForDetails(this.dataRef);
  }

render(){
return(
<View>
<Text>
  trail name: {this.state.trailDetail.trailName}
</Text>
<Text>
  trail start: {this.state.trailDetail.trailStart}
</Text>
<Text>
  trail end: {this.state.trailDetail.trailEnd}
</Text>

</View>
)
}


  }

module.exports = InfoScreen
