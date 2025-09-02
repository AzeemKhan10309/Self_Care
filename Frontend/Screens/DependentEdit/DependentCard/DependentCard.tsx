import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./DependentCard.styles";
interface DependentCardProps {
  name: string;
  relationship: string;
  age: number;
  imageUri?: string;           
  onEditPress?: () => void;     
  onPress?: () => void;         
}

const DependentCard: React.FC<DependentCardProps> = ({
  name,
  relationship,
  age,
  imageUri,
  onEditPress,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      accessible
      accessibilityLabel={`Dependent card for ${name}`}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri || "https://via.placeholder.com/80" }}
          style={styles.image}
        />
        {onEditPress && (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={onEditPress}
            accessible
            accessibilityLabel="Edit Dependent"
          >
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>

      <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">
        <Text style={styles.label}>Relationship </Text>| {relationship}{" "}
        <Text style={styles.label}>Age </Text>| {age} years
      </Text>
    </TouchableOpacity>
  );
};



export default DependentCard;
