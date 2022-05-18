import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./src/consts/colors";
import OnBoardScreen from "./src/views/screens/OnBoardScreen";
import FavoriteScreen from "./src/views/screens/FavoriteScreen";
import ContactScreen from "./src/views/screens/ContactScreen";
import SettingScreen from "./src/views/screens/SettingScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import CartScreen from "./src/views/screens/CartScreen";
import NotifyScreen from "./src/views/screens/NotifyScreen";
import ProfileScreen from "./src/views/screens/ProfileScreen";
import InfoUserScreen from "./src/views/screens/InfoUserScreen";
import BottomNavigatorAdmin from "./src/views/navigation/BottomNavigatorAdmin";
import SignIn from "./src/views/Authentication/SignIn";
import SignUp from "./src/views/Authentication/SignUp";
import OrderScreen from "./src/views/screens/OrderScreen";
import DeliverScreen from "./src/views/screens/DeliverScreen";
import SuccessScreen from "./src/views/screens/SuccessScreen";
import AddProductScreen from "./src/views/screens/AddProductScreen";
import DetailProductScreen from "./src/views/screens/DetailProductScreen";
import CategoryScreen from "./src/views/screens/CategoryScreen";
import BottomNavigator from "./src/views/navigation/BottomNavigator";
import OrderAdminScreen from "./src/views/screens/OderAdminScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-context" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="HomeAdmin" component={BottomNavigatorAdmin} />

        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="OderAdmin" component={OrderAdminScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="ForgotPassword" component={CartScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Notify" component={NotifyScreen} />
        <Stack.Screen name="InfoUser" component={InfoUserScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Deliver" component={DeliverScreen} />
        <Stack.Screen name="SuccessOrder" component={SuccessScreen} />
        <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
