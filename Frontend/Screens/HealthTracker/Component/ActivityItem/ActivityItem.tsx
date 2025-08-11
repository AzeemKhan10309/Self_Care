import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './ActivityItem.styles';
interface Props {
  name: string;
  distance: string;
  calories: string;
  image: any;
  onPress?: () => void;
}

const ActivityItem: React.FC<Props> = ({ name, distance, calories, image, onPress }) => {
  return (
    <View style={styles.row}>
      <Image source={image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>{distance} ({calories})</Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={onPress}>
        <Icon name="play" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
export default ActivityItem;