import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {Button, Input} from 'react-native-elements';
import {useState} from 'react';

interface AddBookProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  addBook: (book: any) => void;
}

export const AddBook = ({navigation, addBook}: AddBookProps) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [price, setPrice] = useState('');

  const validateOptions = !(
    title.length &&
    subtitle.length &&
    price.length &&
    !~price.indexOf('-') &&
    !~price.indexOf(',')
  );

  return (
    <View style={styles.container}>
      <Input label={'Title'} onChangeText={setTitle} />
      <Input label={'Subtitle'} onChangeText={setSubtitle} />
      <Input keyboardType={'numeric'} label={'Price'} onChangeText={setPrice} />
      <Button
        type={'clear'}
        title={'Add'}
        onPress={() => {
          addBook({title, subtitle, price});
          navigation.goBack();
        }}
        disabled={validateOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
});
