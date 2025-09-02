import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Medicen.styles";

interface MedicineCardProps {
  name: string;
  dose: string;
  time: string;
  quantity: string;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  name,
  dose,
  time,
  quantity,
  onUpdate,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>🕗 {time}</Text>
          <Text style={styles.detailText}>💊{dose} {quantity}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {onUpdate && (
          <TouchableOpacity style={styles.updateButton} onPress={onUpdate}>
            <Image
              source={require("../../../assets/update.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Image
              source={require("../../../assets/Del.png")}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MedicineCard;
