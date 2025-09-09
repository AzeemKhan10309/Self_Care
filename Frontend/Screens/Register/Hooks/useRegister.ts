import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/Store";
import { clearCollectInfo } from "../../../Redux/CollectInfoSlice";
import { registerUser } from "../../../Redux/AuthSlice";

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collectInfo = useSelector((state: RootState) => state.collectInfo);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Optional stubs for future username check
  const checkUsername = (username: string) => {
    console.log("[DEBUG] checkUsername called:", username);
    setUsernameAvailable(true);
    setUsernameMessage("Available");
    setSuggestions([]);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setUsername(suggestion);
    setUsernameAvailable(true);
    setUsernameMessage("✅ Username selected");
    setSuggestions([]);
  };

 const handleRegister = async (
  role: "user" | "doctor" | "trainer" = "user",
  form?: { name?: string; username?: string; email?: string; password?: string; phone?: string },
  extraInfo?: any
) => {
  const finalName = form?.name || name;
  const finalUsername = form?.username || username;
  const finalEmail = form?.email || email;
  const finalPassword = form?.password || password;
  const finalPhone = form?.phone || phone;

  const finalCollectInfo = extraInfo || collectInfo;

  const payload = {
    name: finalName,
    username: finalUsername,
    email: finalEmail,
    password: finalPassword,
    phone: finalPhone,
    role, // ✅ include role here
    collectInfo: finalCollectInfo,
  };

  console.log("[useRegister] Final registration payload:", payload);

  setLoading(true);
  try {
    const result = await dispatch(registerUser(payload)).unwrap(); // ✅ sends role
    dispatch(clearCollectInfo());
    Alert.alert("Success", "Registration successful!");
  } catch (err: any) {
    console.error("[useRegister] Registration error:", err);
    Alert.alert("Error", err?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return {
    name, setName,
    username, setUsername,
    usernameAvailable, usernameMessage, suggestions,
    email, setEmail,
    password, setPassword,
    phone, setPhone,
    loading,
    checkUsername,
    handleSelectSuggestion,
    handleRegister,
  };
};
