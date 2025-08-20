import { StyleSheet } from "react-native";

export const switchColors = {
  trackFalse: "#FFFFFF",
  trackTrue: "#1F62E8",   // green
  thumbFalse: "#FFFFFF",
  thumbTrue: "#ffffff",
  iosBg: "#FFFFFF",
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    flex: 1,
  },
  input: {
    marginVertical: 8,
  },
});

export default styles;
