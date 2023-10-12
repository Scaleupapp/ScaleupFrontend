import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ColorCode from '../constants/Styles';

const ProgressBar = ({ progress, duration }) => {
  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: duration || 1000, // Default duration in milliseconds
      useNativeDriver: false, // Required for width animation
    }).start();
  }, [progress, duration, widthAnim]);

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
      <Text style={{color:ColorCode.black_Color}}>hdvbdshvhds</Text>
      <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    justifyContent:'space-between',
     backgroundColor:ColorCode.lightGrey,
     marginTop:20
 
  },
  progressBar: {
    height: 40,
    backgroundColor:ColorCode.lightGrey
  },
  progressText: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default ProgressBar;