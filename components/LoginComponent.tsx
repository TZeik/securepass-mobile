import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  Alert 
} from 'react-native';

interface LoginComponentProps {
  logoImage: any;
  onLogin: (username: string, password: string) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ logoImage, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      username: '',
      password: ''
    };

    if (!username.trim()) {
      newErrors.username = 'El usuario es requerido';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateFields()) {
      onLogin(username, password);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        {/* Imagen del logo */}
        <Image 
          source={logoImage} 
          style={styles.logo} 
          resizeMode="contain"
        />

        {/* Campo de usuario */}
        <TextInput
          style={[styles.input, errors.username ? styles.inputError : null]}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({...errors, username: ''});
          }}
          autoCapitalize="none"
        />
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}

        {/* Campo de contraseña */}
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({...errors, password: ''});
          }}
          secureTextEntry
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        
      
        {/* Botón de login */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loginContainer: {
    paddingHorizontal: 30,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
    fontSize: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  optionText: {
    color: '#555',
  },
  forgotPassword: {
    color: '#007AFF',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginComponent;