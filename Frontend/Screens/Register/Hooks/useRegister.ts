import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/Store";
import { clearCollectInfo } from "../../../Redux/CollectInfoSlice";
import { registerUser } from "../../../Redux/AuthSlice";
import { apiRequest } from "../../../Services/api";

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

 
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkUsername = useCallback((name: string) => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      if (!name) {
        setUsernameAvailable(null);
        setUsernameMessage("");
        setSuggestions([]);
        return;
      }

      try {
        const res: any = await apiRequest(`/users/check-username/${name}`, "GET");

        if (!("error" in res)) {
          if (res.available) {
            setUsernameAvailable(true);
            setUsernameMessage("✅ Username is available");
            setSuggestions([]);
          } else {
            setUsernameAvailable(false);
            setUsernameMessage("❌ Username already taken");
            setSuggestions(res.suggestions || []);
          }
        }
      } catch (err) {
        setUsernameAvailable(null);
        setUsernameMessage("⚠️ Error checking username");
        setSuggestions([]);
      }
    }, 500);
  }, []);

  const handleSelectSuggestion = (sug: string) => {
    setUsername(sug);
    setSuggestions([]);
    setUsernameAvailable(true);
    setUsernameMessage("✅ Username is available");
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !username) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (usernameAvailable === false) {
      Alert.alert("Error", "Username is already taken. Please choose another one.");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        registerUser({ name, username, email, password, phone, collectInfo })
      ).unwrap();

      dispatch(clearCollectInfo());
      Alert.alert("Success", "Registration successful!");
    } catch (err: any) {
      Alert.alert("Registration Error", err || "Something went wrong");
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
    handleRegister
  };
};
