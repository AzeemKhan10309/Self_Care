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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setCollectInfo } from "../../Redux/CollectInfoSlice";
import { AppDispatch } from "../../Redux/Store";
import styles from "./CollectInfo.styles";
type CollectInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CollectInfo"
>;

const CollectInfoScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<CollectInfoScreenNavigationProp>();

  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState<number | null>(null);

  const [isAgePickerVisible, setAgePickerVisible] = useState(false);
  const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);

  const ageOptions = Array.from({ length: 84 }, (_, i) => (i + 7).toString());
  const genderOptions = ["Male", "Female", "Other"];

  const handleSubmit = () => {
    dispatch(setCollectInfo({ age, gender, weight }));
    navigation.navigate("Register");
  };

  const renderPickerModal = (
    visible: boolean,
    data: string[],
    onSelect: (item: string) => void,
    onClose: () => void,
    selectedValue: string | number | null
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
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Tell me more about yourself</Text>

          {/* Age Picker */}
          <TouchableOpacity onPress={() => setAgePickerVisible(true)}>
            <Input
              value={age ? age.toString() : ""}
              placeholder="Select your age"
              onChangeText={() => {}}
              label="Age"
              editable={false}
            />
          </TouchableOpacity>

          {/* Weight Input */}
          <Input
            value={weight ? weight.toString() : ""}
            placeholder="Enter your weight in kg"
            onChangeText={(text) => setWeight(Number(text))}
            label="Weight (kg)"
            keyboardType="numeric"
              editable={true}

          />

          {/* Gender Picker */}
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

          {/* Modals */}
          {renderPickerModal(
            isAgePickerVisible,
            ageOptions,
            (selectedAge) => setAge(Number(selectedAge)),
            () => setAgePickerVisible(false),
            age
          )}
          {renderPickerModal(
            isGenderPickerVisible,
            genderOptions,
            setGender,
            () => setGenderPickerVisible(false),
            gender
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
export default CollectInfoScreen;