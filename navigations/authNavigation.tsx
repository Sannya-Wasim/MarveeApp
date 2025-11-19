import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screen/authScreens/Login';

export type AuthStackType = {
    Login: undefined,
    Signup: undefined,
    OTPScreen:undefined,
    RegisterScreen:undefined,
    PasswordScreen:undefined
};


const Stack = createNativeStackNavigator<AuthStackType>();

export default function AuthScreenNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}