# Proyecto de Prueba de Logins

Este proyecto está creado para probar diferentes métodos de login en React Native/Expo, comenzando con la autenticación de Google.

## Configuración del Login de Google

Para configurar correctamente el login de Google, sigue estos pasos:

1. **Registra tu aplicación en Google Cloud Platform**:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Ve a "APIs y Servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "ID de cliente OAuth"
   - Configura la pantalla de consentimiento OAuth si es necesario
   - Para el tipo de aplicación, selecciona "Aplicación web", "Android" y/o "iOS" según tus necesidades

2. **Para aplicaciones web/Expo Go**:
   - Para "Orígenes de JavaScript autorizados", añade:
     - `https://localhost`
     - `https://auth.expo.io`
   - Para "URI de redirección autorizados", añade:
     - `https://auth.expo.io/@your-expo-username/logins`

3. **Para Android**:
   - Crea un ID de cliente OAuth para Android
   - Para el nombre del paquete, usa el que configuraste en app.json (`com.yourcompany.logins`)
   - Para la huella digital SHA-1, genera una siguiendo las instrucciones de Expo

4. **Para iOS**:
   - Crea un ID de cliente OAuth para iOS
   - Para el ID del Bundle, usa el que configuraste en app.json (`com.yourcompany.logins`)

5. **Actualiza tu aplicación con los IDs obtenidos**:
   - Abre `app/auth/login.tsx`
   - Reemplaza los valores de clientId, iosClientId y androidClientId con tus IDs reales

```typescript
const [request, response, promptAsync] = Google.useAuthRequest({
  clientId: 'TU_WEB_CLIENT_ID', // Reemplaza con tu ID real para Web/Expo
  iosClientId: 'TU_IOS_CLIENT_ID', // Reemplaza con tu ID para iOS
  androidClientId: 'TU_ANDROID_CLIENT_ID', // Reemplaza con tu ID para Android
});
```

## Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Iniciar el proyecto
npm start
```

## Flujo de la Aplicación

1. El usuario es redirigido a la pantalla de login al iniciar la aplicación
2. Al presionar "Continuar con Google", se abre el flujo de autenticación de Google
3. Después de una autenticación exitosa, el usuario es redirigido a la pantalla principal de la aplicación

## Próximos Pasos

- Implementar login con Facebook
- Implementar login con Apple
- Implementar login con email y contraseña
