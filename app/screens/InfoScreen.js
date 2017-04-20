
import React, { Component } from 'react';

import {Container, Content, Text} from 'native-base';

import {View, Navigator} from 'react-native';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props)
  }



render(){
return(
<View>
<Text>
  Fucking info screen
</Text>
<Text>
{this.props.trail.trailName}
</Text>
</View>  
)
}


  }

module.exports = InfoScreen
