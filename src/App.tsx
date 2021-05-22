import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {About} from './pages/About';
import {Graphics} from './pages/Graphics';
import {Books} from './pages/Books';
import {Images} from './pages/Images';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import initDatabase from "./infrastructure/db/init";

const isPortrait = (width: number, height: number): string =>
  height >= width ? 'portrait' : 'landscape';

const App = () => {
  const {width, height} = Dimensions.get('screen');
  const [_, changeOrientation] = useState(isPortrait(width, height));
  Dimensions.addEventListener('change', () => {
    const {width, height} = Dimensions.get('screen');
    changeOrientation(isPortrait(width, height));
  });

  useEffect(() => {
    (async () => await initDatabase())()
  }, []);

  const [index, setIndex] = React.useState(0);
  const routes = [
    {
      key: 'about',
      title: 'About',
      icon: require('../public/icons/about-icon.png'),
    },
    {
      key: 'graphics',
      title: 'Graphics',
      icon: require('../public/icons/graphics-icon.png'),
    },
    {
      key: 'books',
      title: 'Books',
      icon: require('../public/icons/book-icon.png'),
    },
    {
      key: 'images',
      title: 'Images',
      icon: require('../public/icons/image-icon.png'),
    },
  ];

  const renderScene = BottomNavigation.SceneMap({
    about: About,
    graphics: Graphics,
    books: Books,
    images: Images,
  });

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{
          backgroundColor: 'purple',
        }}
      />
    </NavigationContainer>
  );
};

export default App;
