import * as React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import AboutBookDto from '../../entities/AboutBookDto';
import {getBookByIsbn13} from '../../services/books.service';

export const AboutBook = ({route}: any) => {
  const [book, setBook] = useState<AboutBookDto>(new AboutBookDto());
  const {isbn13} = route.params;
  useEffect(() => {
    if (!isbn13) return;
    (async () => {
      const book = await getBookByIsbn13(isbn13);
      setBook(book ?? new AboutBookDto());
    })();
  }, [isbn13]);
  const {
    title,
    subtitle,
    authors,
    publisher,
    pages,
    year,
    rating,
    desc,
    price,
    image,
  } = book;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: image?.length
              ? image
              : '../../../public/images/default_book.jpeg',
          }}
        />
      </View>
      <View style={styles.textGroup}>
        <Text>{`Title: ${title ?? ''}`}</Text>
        <Text>{`Subtitle: ${subtitle ?? ''}`}</Text>
        <Text>{`Desc: ${desc ?? ''}`}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text>{`Authors: ${authors ?? ''}`}</Text>
        <Text>{`Publisher: ${publisher ?? ''}`}</Text>
      </View>
      <View style={styles.textGroup}>
        <Text>{`Pages: ${pages ?? ''}`}</Text>
        <Text>{`Year: ${year ?? ''}`}</Text>
        <Text>{`Rating: ${rating ?? ''}`}</Text>
        <Text>{`Price: ${price ?? ''}`}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textGroup: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  image: {
    height: 300,
    width: 300,
  },
});
