import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BooksList} from './booksPages/BookList';
import {useEffect, useState} from 'react';
import {AddBook} from './booksPages/AddBook';
import {Header} from 'react-native-elements';
import {AboutBook} from './booksPages/AboutBook';
import BookDto from '../entities/BookDto';

const Stack = createStackNavigator();

export const Books = () => {
  const [books, setBooks] = useState<BookDto[]>([]);

  const deleteBook = (index: number) => {
    const data = Array.from(books);
    data.splice(index, 1);
    setBooks(data);
  };
  const addBook = (book: any) => setBooks([...books, book]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'BooksList'}
        options={{
          header: ({navigation}) => {
            return (
              <Header
                backgroundColor={'white'}
                centerComponent={{
                  text: 'Books',
                  style: {fontSize: 22, fontWeight: 'bold', letterSpacing: 2},
                }}
                rightComponent={{
                  icon: 'add',
                  onPress: (_) => navigation.navigate('Add'),
                }}
              />
            );
          },
        }}>
        {(props) => (
          <BooksList {...props} books={books} deleteBook={deleteBook} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={'Add'}
        options={{
          header: ({navigation}) => {
            return (
              <Header
                backgroundColor={'white'}
                leftComponent={{
                  icon: 'chevron-left',
                  onPress: (_) => navigation.goBack(),
                }}
              />
            );
          },
        }}>
        {(props) => <AddBook {...props} addBook={addBook} />}
      </Stack.Screen>
      <Stack.Screen
        name={'AboutBook'}
        component={AboutBook}
        options={{
          header: ({navigation}) => {
            return (
              <Header
                backgroundColor={'white'}
                leftComponent={{
                  icon: 'chevron-left',
                  onPress: (_) => navigation.goBack(),
                }}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
