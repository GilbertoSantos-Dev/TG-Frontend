import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkSession } from "./src/services/LoginService";

import "./ReactotronConfig";
import FakeScreen from "./src/screens/devTestes/FakeScreen";
import TestScreen from "./src/screens/devTestes/TestScreen";
import TestJSON from "./src/screens/devTestes/TestJSON";

import LoginScreen from "./src/screens/auth/LoginScreen";
import AdminMenuScreen from "./src/screens/menus/AdminMenuScreen";
import UserMenuScreen from "./src/screens/menus/UserMenuScreen";

import AdminAtividadeScreen from "./src/screens/atividades/AdminAtividadeScreen";
import AtividadeScreen from "./src/screens/atividades/AtividadeScreen";

import CarroScreen from "./src/screens/carros/CarroScreen";
import AdminCarroScreen from "./src/screens/carros/AdminCarroScreen";
import EditCarroScreen from "./src/screens/carros/EditCarroScreen";
import NewCarroScreen from "./src/screens/carros/NewCarroScreen";

import LocalScreen from "./src/screens/locais/LocalScreen";
import AdminLocalScreen from "./src/screens/locais/AdminLocalScreen";
import EditLocalScreen from "./src/screens/locais/EditLocalScreen";
import NewLocalScreen from "./src/screens/locais/NewLocalScreen";

import RotaScreen from "./src/screens/rotas/RotaScreen";
import AdminRotaScreen from "./src/screens/rotas/AdminRotaScreen";
import EditRotaScreen from "./src/screens/rotas/EditRotaScreen";
import NewRotaScreen from "./src/screens/rotas/NewRotaScreen";

import UsuarioScreen from "./src/screens/usuarios/UsuarioScreen";
import AdminUsuarioScreen from "./src/screens/usuarios/AdminUsuarioScreen";
import EditUsuarioScreen from "./src/screens/usuarios/EditUsuarioScreen";
import NewUsuarioScreen from "./src/screens/usuarios/NewUsuarioScreen";

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState("Login");

  useEffect(() => {
    const checkInitialRoute = async () => {
      try {
        const sessionActive = await checkSession();
        if (sessionActive) {
          // Se há uma sessão ativa, determine o papel do usuário
          const userRole = await AsyncStorage.getItem("userRole");

          if (userRole === "admin") {
            setInitialRouteName("AdminMenu");
          } else if (userRole === "user") {
            setInitialRouteName("UserMenu");
          }
        } else {
          // Se não há sessão ativa, redirecione para a tela de login
          setInitialRouteName("Login");
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setInitialRouteName("Login"); // Em caso de erro, redirecione para a tela de login
      } finally {
        setIsLoading(false);
      }
    };

    checkInitialRoute();
  }, []);

  if (isLoading) {
    return null; // Pode exibir um carregando enquanto verifica a sessão
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminMenu"
          component={AdminMenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenuScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="FakeScreen" component={FakeScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="TestJSON" component={TestJSON} />

        <Stack.Screen name="AdminAtividade" component={AdminAtividadeScreen} />
        <Stack.Screen name="Atividade" component={AtividadeScreen} />

        <Stack.Screen name="Carro" component={CarroScreen} />
        <Stack.Screen name="AdminCarro" component={AdminCarroScreen} />
        <Stack.Screen name="EditCarro" component={EditCarroScreen} />
        <Stack.Screen name="NewCarro" component={NewCarroScreen} />

        <Stack.Screen name="Local" component={LocalScreen} />
        <Stack.Screen name="AdminLocal" component={AdminLocalScreen} />
        <Stack.Screen name="EditLocal" component={EditLocalScreen} />
        <Stack.Screen name="NewLocal" component={NewLocalScreen} />

        <Stack.Screen name="Rota" component={RotaScreen} />
        <Stack.Screen name="AdminRota" component={AdminRotaScreen} />
        <Stack.Screen name="EditRota" component={EditRotaScreen} />
        <Stack.Screen name="NewRota" component={NewRotaScreen} />

        <Stack.Screen name="Usuario" component={UsuarioScreen} />
        <Stack.Screen name="AdminUsuario" component={AdminUsuarioScreen} />
        <Stack.Screen name="EditUsuario" component={EditUsuarioScreen} />
        <Stack.Screen name="NewUsuario" component={NewUsuarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
