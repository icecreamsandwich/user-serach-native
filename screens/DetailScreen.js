/* @flow */

import * as React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

export default class DetailScreen extends React.Component {
/**
 * constructor
 * @param {*} props
 */
  constructor(props){
    super(props);
  }

  /**
   * View styling
   */
  viewStyle() {
    return {
      flex: 1,
      backgroundColor: "green",
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  render() {
    const { navigation } = this.props;
    var userDetails = [];
    userDetails = navigation.getParam('Details', 'NO-ID');

    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={0}>
        <View style={this.viewStyle()}>
          <PhoneD label="Right"  phoneDetails={userDetails} />
        </View>
        <View style={this.viewStyle()}>
          <PhoneS label="Left" phoneDetails={userDetails}/>
        </View>
      </Swiper>
    );
  }
}

class PhoneD extends React.Component {
  render() {

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.author}>
          <Image
            style={styles.avatar}
            source={{uri: this.props.phoneDetails.avatar}}
          />
          <View style={styles.meta}>
            <Text style={styles.name}>{this.props.phoneDetails.id}</Text>
            <Text style={styles.name}>{this.props.phoneDetails.first_name}</Text>
            <Text style={styles.timestamp}>{this.props.phoneDetails.last_name}</Text>
          </View>
        </View>
        <Text style={styles.title}>User Details</Text>
        <Text style={styles.paragraph}>
          He is the fullstack developer in the company having strong java background and
          having experience in java frameworks such as spring and hibernate . Recently he made  his hands
          on reactJs for an inhouse project. He has over 4 years of experience in the stack
        </Text>
        <Image style={styles.image} source={{uri: this.props.phoneDetails.avatar}} />
        
      </ScrollView>
    )
  }
}


class PhoneS extends React.Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.author}>
          <Image
            style={styles.avatar}
            source={{uri: this.props.phoneDetails.avatar}}
          />
          <View style={styles.meta}>
            <Text style={styles.name}>{this.props.phoneDetails.first_name}</Text>
            <Text style={styles.timestamp}>{this.props.phoneDetails.last_name}</Text>
          </View>
        </View>
        <Text style={styles.title}>Advanced Details</Text>
        <Text style={styles.paragraph}>
          He is the fullstack developer in the company having strong java background and
          having experience in java frameworks such as spring and hibernate . Recently he made  his hands
          on reactJs for an inhouse project. He has over 4 years of experience in the stack
        </Text>


      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    paddingVertical: 16,
  },
  author: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  meta: {
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  timestamp: {
    color: '#999',
    fontSize: 14,
    lineHeight: 21,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 36,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  paragraph: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 8,
  },
});
