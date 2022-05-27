import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import ViewDeatils from './View';




const Stack=createStackNavigator();


export default function Screens(){

    return(
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name='home' component={Main}></Stack.Screen>
          <Stack.Screen name='view' component={ViewDeatils}></Stack.Screen>
        </Stack.Navigator>
    )
}