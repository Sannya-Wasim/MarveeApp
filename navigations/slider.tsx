import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SliderScreen from '../screen/slider';

const Stack = createNativeStackNavigator();


export default function SliderScreenNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Slider" component={SliderScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}