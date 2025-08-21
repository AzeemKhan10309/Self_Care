import React from "react";
import { View, Text, Switch } from "react-native";
import Input from "../../../../Components/Input/Input";
import styles, { switchColors } from "./Reminder.styles";

interface Props {
  reminderEnabled: boolean;
  setReminderEnabled: (val: boolean) => void;
  reminderBefore: number;
  setReminderBefore: (val: number) => void;
  repeat: boolean;
  setRepeat: (val: boolean) => void;
}

const Reminder: React.FC<Props> = ({
  reminderEnabled,
  setReminderEnabled,
  reminderBefore,
  setReminderBefore,
  repeat,
  setRepeat,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders:</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Enable Reminder</Text>
        <Switch
          value={reminderEnabled}
          onValueChange={setReminderEnabled}
          trackColor={{
            false: switchColors.trackFalse,
            true: switchColors.trackTrue,
          }}
          thumbColor={
            reminderEnabled ? switchColors.thumbTrue : switchColors.thumbFalse
          }
          ios_backgroundColor={switchColors.iosBg}
        />
      </View>

      <Text style={styles.label}>Reminder Before (minutes)</Text>
      <Input
        placeholder="Reminder Before (minutes)"
        value={reminderBefore.toString()}
        onChangeText={(val) => setReminderBefore(Number(val))}
        keyboardType="numeric"
        containerStyle={styles.input}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Repeat</Text>
        <Switch
          value={repeat}
          onValueChange={setRepeat}
          trackColor={{
            false: switchColors.trackFalse,
            true: switchColors.trackTrue,
          }}
          thumbColor={repeat ? switchColors.thumbTrue : switchColors.thumbFalse}
          ios_backgroundColor={switchColors.iosBg}
        />
      </View>
    </View>
  );
};

export default Reminder;
