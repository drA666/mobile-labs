import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Plot} from '../components/Plot';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useState} from 'react';
import {Diagram} from '../components/Diagram';

const styles = StyleSheet.create({
  control: {
    width: 300,
    maxWidth: '90%',
    marginTop: 10,
    marginBottom: 16,
  },
  view: {
    flex: 1,
    maxHeight: '95%',
    alignItems: 'center',
    padding: 10,
  },
});

const sin = (x: number) => Math.sin(x);

export const Graphics = () => {
  const [activeComponent, setActiveComponent] = useState(0);
  return (
    <View style={styles.view}>
      <SegmentedControl
        style={styles.control}
        values={['Plot', 'Diagram']}
        selectedIndex={activeComponent}
        onChange={({nativeEvent}) => {
          setActiveComponent(nativeEvent.selectedSegmentIndex);
        }}
      />
      {
        [
          <Plot
            func={sin}
            interval={0.1}
            max={6.28}
            min={-6.28}
            height={200}
            width={320}
          />,
          <Diagram />,
        ][activeComponent]
      }
    </View>
  );
};
