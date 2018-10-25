/* @flow */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  FlatList,
  Picker,
  Slider,
  StatusBar,
  Button
} from 'react-native';

export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      brandName: "",
      priceRange: 200,
      brand: "",
      showBrand:false,
      isLoading:true,
      photos: [],
      albums: [],
      userDetails: [],
    };
  }

setBgColor() {
    return {
      borderRadius: 12,
      backgroundColor: "green",
  }
}

//call the API to fetch Data
componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/albums/')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          albums:json,
          isLoading:false
        });
     })
     .catch((error) => {
      console.error(error);
    });
  }

  handleButtonPress() {
         //log all form data
         var nPriceMin = 0;
         var nPriceMax = this.state.priceRange;
         var brand = this.state.brand;
         //fetch request to get filtered data , TODO //call the slug api instead
         fetch('http://192.168.1.3/gsmarena-API/api/?action=brands&sMakers='+brand+'&nPriceMin='+nPriceMin+'&nPriceMax='+nPriceMax)
           .then(response => response.json())
           .then(responseJson => this.setState({
             filteredBrands:responseJson.data ,
             showBrand:true
            }));
  }

  goToDetailsScreen(item){
    //call the reqres API to get random user details
    if(item.id > 12){
      var min = 1; var max = 12 ;
      var userId = Math.floor(Math.random()*(max-min+1)+min );
    }else userId = item.id;
    fetch('https://reqres.in/api/users/'+userId)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          userDetails:json.data,
          isLoading:false
        });
     })
     .catch((error) => {
      console.error(error);
    });
    this.props.navigation.navigate('DetailScreen',{Details:this.state.userDetails});
  }

  renderPickerItems(){
    // if(this.state.brands.length > 0){
      this.state.customData.map(function(brand,i){
        return (
          <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}}
            label="{brand.title}"
            value="{brand.count}" key={i} />
        );
      });
    // }
  }

  _renderItem = ({ item }) => {
      return (
       <TouchableHighlight style={[styles.button, this.setBgColor()]} onPress={()=>this.goToDetailsScreen(item)}>
         <View style={styles.item}>
           <View style={styles.avatar}>
             <Text style={styles.letter}>{item.title.slice(0, 1).toUpperCase()}</Text>
           </View>
           <View style={styles.details}>
             <Text style={styles.name}>{item.title}</Text>
             <Text style={styles.number}>{item.url}</Text>
           </View>
         </View>
       </TouchableHighlight>
      );
  }
  _ItemSeparator = () => <View style={styles.separator}></View>;

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <StatusBar
          backgroundColor="grey"
          barStyle="light-content"
        />

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}> Albums </Text>
        </View>

        <FlatList
          data={this.state.albums}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparator}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    marginBottom: 15,
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666666',
    fontSize: 18
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    margin: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  number: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  }
});
