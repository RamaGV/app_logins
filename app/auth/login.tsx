import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';

// Asegúrate de registrar tu app en Google Developer Console
// y añadir los IDs de cliente en app.json
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'TU_WEB_CLIENT_ID', // Reemplaza con tu ID real de cliente para Web/Expo
    iosClientId: 'TU_IOS_CLIENT_ID', // Reemplaza con tu ID real de cliente para iOS
    androidClientId: 'TU_ANDROID_CLIENT_ID', // Reemplaza con tu ID real de cliente para Android
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      setLoading(true);
      // Obtener el token de acceso
      const { authentication } = response;
      
      // Aquí normalmente harías una llamada a tu backend para verificar el token
      // y crear una sesión, o usar directamente el token para autenticar con Firebase, etc.
      console.log('Authentication successful:', authentication);
      
      // Simular verificación de autenticación
      setTimeout(() => {
        setLoading(false);
        // Navegar a la pantalla principal después de autenticarse
        router.replace('/(tabs)');
      }, 1000);
    }
  }, [response]);

  const handleGoogleLogin = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>
      
      <View style={styles.loginContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4285F4" />
        ) : (
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            disabled={!request}
          >
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
              style={styles.googleIcon} 
            />
            <Text style={styles.googleButtonText}>Continuar con Google</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#757575',
    fontSize: 16,
    fontWeight: '500',
  },
}); 