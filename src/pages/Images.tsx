import * as React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import {useEffect, useState} from 'react';
import {ImagesGrid} from '../components/ImagesGrid';
import ImagePicker from 'react-native-image-picker';
import {getImagesByReq} from '../infrastructure/api/images.api';

const chooseImage = (addImage: (a: string) => void) => {
  const options = {
    noData: true,
  };
  ImagePicker.launchImageLibrary(options, (response) => {
    if (!response.uri) return;
    addImage(response.uri);
  });
};

export const Images = () => {
  const [images, setImages] = useState<string[][]>([]);
  useEffect(() => {
    (async () => {
      try {
        const img = await getImagesByReq();
        const chunk_size = 6;
        const chunks = img
          .map((_: any, i: number) =>
            i % chunk_size === 0 ? img.slice(i, i + chunk_size) : null,
          )
          .filter((e: any) => e);
        setImages(chunks);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const addImage = (image: string) => {
    const lastImageSet = images.pop() ?? [];
    if (lastImageSet.length < 6) {
      const data = [...lastImageSet, image];
      setImages([...images, data]);
      return;
    }
    setImages([...images, lastImageSet, [image]]);
  };

  const renderItem = ({item, index}: any) => {
    return <ImagesGrid images={item} key={index} />;
  };
  return (
    <>
      <Header
        backgroundColor={'white'}
        rightComponent={{icon: 'add', onPress: () => chooseImage(addImage)}}
      />
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <ActivityIndicator
            size={'large'}
            color={'purple'}
            style={{marginTop: 30}}
          />
        }
      />
    </>
  );
};
