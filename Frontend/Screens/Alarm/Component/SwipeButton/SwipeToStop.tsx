import React from 'react';
import { Dimensions } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

interface SwipeToStopProps {
  onSwipe: () => void;
}

const SwipeToStop: React.FC<SwipeToStopProps> = ({ onSwipe }) => {
  return (
    <SwipeButton
      disabled={false}
      swipeSuccessThreshold={70}
      height={55}
      width={width * 0.85}
      title="Swipe to Stop"
      titleColor="#fff"
      railBackgroundColor="#0B46C5"
      railBorderColor="#0B46C5"
      thumbIconBackgroundColor="#fff"
      thumbIconBorderColor="#fff"
      thumbIconComponent={() => (
        <Icon name="check" size={28} color="#1E5BFF" />
      )}
      onSwipeSuccess={onSwipe}
    />
  );
};

export default SwipeToStop;
