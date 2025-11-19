import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../screen/Home';
import AddNewVisit from '../../screen/Home/addnewVisit';
import HelpScreen from '../../screen/Home/HelpScreen';
import VisitScreen from '../../screen/Home/VisitScreen';
import AddPaitentDetail from '../../screen/Home/AddPaitentDetail';

export type HomeStackScreenType = {
    MainHomeScreen: undefined,
    AddNewVisit: undefined,
    HelpScreen:undefined,
    VisitScreen:{
        id:any
    }
    AddPaitentDetail:{
        name:string
        nic:string
        age : string
        gender:string
        visitId:any
    }
};


const Stack = createNativeStackNavigator<HomeStackScreenType>();

export default function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='MainHomeScreen' component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='AddNewVisit' component={AddNewVisit} options={{ headerShown: false }} />
            <Stack.Screen name='HelpScreen' component={HelpScreen} options={{ headerShown: false }} />
            <Stack.Screen name='VisitScreen' component={VisitScreen} options={{ headerShown: false }} />
            <Stack.Screen name='AddPaitentDetail' component={AddPaitentDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}