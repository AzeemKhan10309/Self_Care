import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CollectInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CollectInfo"
>;

const CollectInfoScreen: React.FC = () => {
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState<number | null>(null);

  const [isAgePickerVisible, setAgePickerVisible] = useState(false);
  const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);

  const ageOptions = Array.from({ length: 84 }, (_, i) => (i + 7).toString());
  const genderOptions = ["Male", "Female", "Other"];

  const navigation = useNavigation<CollectInfoScreenNavigationProp>();

  const handleSubmit = () => {
    console.log("Submitted:", { age, gender, weight });
    navigation.navigate("Login");
  };

  const renderPickerModal = (
    visible: boolean,
    data: string[],
    onSelect: (item: string) => void,
    onClose: () => void,
    selectedValue: string | number | null,
  ) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.pickerBox}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.pickerList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.pickerItem,
                  item === selectedValue?.toString() && styles.selectedItem,
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    item === selectedValue?.toString() &&
                      styles.selectedItemText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Tell me more about yourself</Text>

        <TouchableOpacity onPress={() => setAgePickerVisible(true)}>
          <Input
            value={age ? age.toString() : ""}
            placeholder="Select your age"
            onChangeText={() => {}}
            label="Age"
            editable={false}
          />
        </TouchableOpacity>

        <Input
          value={weight ? weight.toString() : ""}
          placeholder="Enter your weight in kg"
          onChangeText={(text) => setWeight(Number(text))}
          label="Weight (kg)"
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={() => setGenderPickerVisible(true)}>
          <Input
            value={gender}
            placeholder="Select your gender"
            onChangeText={() => {}}
            label="Gender"
            editable={false}
          />
        </TouchableOpacity>

        <Button title="Next" onPress={handleSubmit} />

        {renderPickerModal(
          isAgePickerVisible,
          ageOptions,
          (selectedAge) => setAge(Number(selectedAge)),
          () => setAgePickerVisible(false),
          age,
        )}

        {renderPickerModal(
          isGenderPickerVisible,
          genderOptions,
          setGender,
          () => setGenderPickerVisible(false),
          gender,
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  pickerBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: "60%",
  },
  pickerList: {
    paddingBottom: 20,
  },
  pickerItem: {
    paddingVertical: 14,
    alignItems: "center",
  },
  pickerItemText: {
    fontSize: 18,
    color: "#808080",
    fontWeight: "400",
  },
  selectedItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  selectedItemText: {
    color: "#000000",
    fontWeight: "800",
    fontSize: 20,
  },
});

export default CollectInfoScreen;
