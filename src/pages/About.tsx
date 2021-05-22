import * as React from 'react';
import {View, Text, Image, Linking} from 'react-native';

export const About = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          margin: 0,
          maxHeight: 200,
          resizeMode: 'contain',
        }}
        source={require('../../public/icons/rick.png')}
      />

      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'purple',
          padding: 10,
          borderRadius: 10,
        }}>
        Rasiuk Alona{'\n'}
        Group: IP-83{'\n'}
        SB: IP-8519{'\n'}
        github:
        <Text
          style={{
            color: 'red',
          }}
          onPress={() => Linking.openURL('https://github.com/drA666')}> 
          {' drA666'}
        </Text>
      </Text>
    </View>
  );
};
