import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootState } from "../../../../Redux/Store";
import { apiRequest } from "../../../../Services/api";
import styles from "./Dependents.styles";
import type { DashboardStackParamList } from "../../../../Navigations/User/stacks/DashboardStack";

const BACKEND_IP = "192.168.106.97:5000";

type Dependent = {
  id: string;
  name: string;
  picture?: string;
};

interface DependentsProps {
  showTitle?: boolean;
  showAddButton?: boolean;
}

const Dependents: React.FC<DependentsProps> = ({ showTitle = true, showAddButton = true }) => {
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

const getImageUri = (path?: string) => {
  if (!path) return "https://via.placeholder.com/100";

  let cleanPath = path.replace(/\\/g, "/");

  if (!cleanPath.includes("/dependents/")) {
    cleanPath = cleanPath.replace("/uploads/", "");
    cleanPath = `/uploads/dependents/${cleanPath}`;
  }

  return `http://${BACKEND_IP}${cleanPath}`;
};



  useEffect(() => {
    const fetchDependents = async () => {
      try {
        const response = await apiRequest(`/dependents/user/${userId}`, "GET");
        setDependents(response);
        console.log("✅ Fetched dependents:", response);
      } catch (error) {
        console.error("❌ Error fetching dependents:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchDependents();
  }, [userId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showTitle && <Text style={styles.title}>Dependents</Text>}

      <FlatList
        horizontal
        data={dependents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DependentEdit", { id: item.id })}
          >
           <Image
  source={{ uri: getImageUri(item.picture) }}
  style={styles.image}
/>
            
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={() =>
          showAddButton ? (
            <TouchableOpacity
              style={styles.addCard}
              onPress={() => navigation.navigate("AddDependent")}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          ) : null
        }
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Dependents;
