import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Image} from 'react-native-elements';

const groupImages = (
  images: [],
  width: number,
  minElem: number,
  maxElem: number,
) => {
  const leftImage: Element[] = [];
  const rightImage: Element[] = [];
  const midImage: Element[] = [];
  const mid = ~~(images.length / 2);
  const minWidth = width / (2 * minElem + maxElem);
  images.forEach((image, index) => {
    const imgSize =
      index % images.length === mid && mid != 0
        ? minWidth * maxElem
        : minWidth * minElem;
    const imageElem = (
      <Image
        key={index}
        source={{uri: image}}
        style={{width: imgSize, height: imgSize, ...styles.image}}
        PlaceholderContent={<ActivityIndicator size={'large'} color="purple" />}
      />
    );
    if (index < mid) leftImage.push(imageElem);
    else if (index > mid) rightImage.push(imageElem);
    else if (index === mid) midImage.push(imageElem);
  });
  return {leftImage, midImage, rightImage};
};

export const ImagesGrid = ({images}: any) => {
  const {width} = Dimensions.get('window');
  const {leftImage, midImage, rightImage} = groupImages(images, width, 1, 3);
  return (
    <View style={styles.container}>
      <View style={styles.column}>{leftImage.map((e) => e)}</View>
      <View style={styles.column}>{midImage.map((e) => e)}</View>
      <View style={styles.column}>{rightImage.map((e) => e)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  image: {
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: 'white',
    resizeMode: 'contain',
  },
});
