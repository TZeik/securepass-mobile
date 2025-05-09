import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { getAuthenticatedUser, loginUser, setAuthToken } from "../../api/auth.api";
import { LoginResponse } from "../../types/auth.types";
interface LoginComponentProps {
  logoImage: any;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ logoImage }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // useState para representar carga de datos en botón
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    {
      /* Validador de Email*/
    }
    if (!email.trim()) {
      newErrors.email = "El email es requerido";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email no válido";
      valid = false;
    }

    {
      /* Validador de contraseña */
    }
    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const { token } = await loginUser({ email, password });
      setAuthToken(token);

      // Verificación adicional del usuario
      const verifiedUser = await getAuthenticatedUser();

      navigation.replace("Main", {
        token,
        user: verifiedUser, // Usamos el usuario verificado
      });
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Imagen del Logo */}
      <View style={styles.loginContainer}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />

        {/* Campo de Email */}
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({ ...errors, email: "" });
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        {/* Campo de Contraseña */}
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: "" });
          }}
          secureTextEntry
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        {/* Botón de Login */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {/* Se cambia el valor del botón si el useState is Login es true o false */}
          <Text style={styles.loginButtonText}>
            {isLoading ? "CARGANDO..." : "LOGIN"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loginContainer: {
    paddingHorizontal: 30,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    marginBottom: 10,
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  optionText: {
    color: "#555",
  },
  forgotPassword: {
    color: "#007AFF",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginComponent;
