import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import InfoScreen from '../screens/InfoScreen';
import MapScreen from '../screens/MapScreen';

export default class TrailDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'INFO'
    }
  }

  render() {

    let AppComponent = null;

    //console.log("this.props.selectedTab: "+ this.state.selectedTab);

    if (this.state.selectedTab === 'INFO') {
      AppComponent = InfoScreen;
      //console.log("Selected AppComponent: " + AppComponent);
    } else if (this.state.selectedTab === 'MAP') {
      AppComponent = MapScreen;
      //console.log("Selected AppComponent: " + AppComponent);
    } else {
      //console.log("Selected AppComponent: ERROR");
    }

    return (
      <Container>
               <Header>
                   <Left>
                       <Button transparent onPress={() => this.props.navigator.pop()} >
                           <Icon name='chevron-left' />
                       </Button>
                   </Left>
                   <Body>
                       <Title>Happy Tripper</Title>
                   </Body>
                   <Right>
                     <Icon name='bars'/>

                   </Right>
               </Header>
               <Content>
                   <AppComponent
                   trail={this.props.trail}/>

               </Content>
               <Footer>
                   <FooterTab>
                       <Button onPress={() => this.setState({selectedTab: 'INFO'})}>
                          <Icon name='info' />
                        <Text>Info</Text>
                       </Button>
                       <Button onPress={() => this.setState({selectedTab: 'MAP'})}>
                          <Icon name='map-o' />
                        <Text>Mapa</Text>
                       </Button>
                   </FooterTab>
               </Footer>
           </Container>
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = TrailDetail
