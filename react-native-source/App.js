import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Home, FileText, ShoppingCart, Truck, Clock, Info } from 'lucide-react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import MedicineDetailScreen from './screens/MedicineDetailScreen';
import CartScreen from './screens/CartScreen';
import PrescriptionScreen from './screens/PrescriptionScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import PillReminderScreen from './screens/PillReminderScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#0f172a',
        headerTitleStyle: { fontWeight: '800' },
      }}
    >
      <Stack.Screen 
        name="GrashaHome" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MedicineDetail" 
        component={MedicineDetailScreen} 
        options={{ title: 'Medication Details (PPB Kenya)' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#0284c7',
            tabBarInactiveTintColor: '#64748b',
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
              backgroundColor: '#ffffff',
              borderTopColor: '#dbeafe',
            },
            tabBarLabelStyle: {
              fontSize: 10.5,
              fontWeight: '700',
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Shop"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Prescriptions"
            component={PrescriptionScreen}
            options={{
              tabBarLabel: 'My Rx',
              tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarBadge: 2,
              tabBarBadgeStyle: { backgroundColor: '#ef4444', fontSize: 10, fontWeight: 'bold' },
              tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Track"
            component={OrderTrackingScreen}
            options={{
              tabBarIcon: ({ color, size }) => <Truck color={color} size={size} />,
            }}
          />
          <Tab.Screen
            name="Pills"
            component={PillReminderScreen}
            options={{
              tabBarLabel: 'Pill Streak',
              tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
