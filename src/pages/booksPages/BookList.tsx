import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {BookItem} from '../../components/BookItem';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {Swipeable} from 'react-native-gesture-handler';
import {getBooks} from '../../services/books.service';
import BookDto from '../../entities/BookDto';

export interface BooksListProps {
  books: BookDto[];
  navigation: NavigationScreenProp<NavigationState>;
  deleteBook: (index: number) => void;
}

const ListEmpty = (
  <Text style={{textAlign: 'center', marginTop: 20, color: 'grey'}}>
    Books not found
  </Text>
);

const swipeAction = (onPressAction: () => void) => (
  <TouchableOpacity onPress={onPressAction} style={styles.swipeAction}>
    <Text style={{fontWeight: 'bold', fontSize: 16}}>Delete</Text>
  </TouchableOpacity>
);

export const BooksList = ({books, navigation, deleteBook}: BooksListProps) => {
  const [searchString, setSearchString] = useState('');
  const [booksFound, setBooksFound] = useState<BookDto[]>([]);

  useEffect(() => {
    if (searchString.length < 3) {
      setBooksFound([]);
      return;
    }
    (async () => {
      const books = (await getBooks(searchString)) ?? [];
      setBooksFound(books);
    })();
  }, [searchString]);

  //renderItem
  let swiped: Array<any> = [];
  const renderItem = (
    {item, index}: ListRenderItemInfo<BookDto>,
    on: boolean,
  ) => {
    const onDelete = () => {
      swiped[index]?.close();
      swiped[index] = null;
      deleteBook(index);
    };
    return (
      <Swipeable
        friction={2}
        key={index}
        ref={(ref) => (swiped[index] = ref)}
        renderRightActions={() => (on ? swipeAction(onDelete) : <></>)}>
        <TouchableHighlight
          onPress={() => navigation.navigate('AboutBook', {...item})}>
          <BookItem {...item} />
        </TouchableHighlight>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={setSearchString}
        value={searchString}
        placeholder={'Enter title'}
        platform={'android'}
      />
      <FlatList
        data={searchString ? booksFound : books}
        renderItem={(prop) => renderItem(prop, !searchString.length)}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={ListEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeAction: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});
