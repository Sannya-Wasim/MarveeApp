import { Pressable, Text, View } from 'react-native';
import { BLACK } from '../../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackScreenType } from '../../../navigations/Stacks/homeStack';

type StackProps = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'>;
type Props = StackProps;

const CallScreen = ({ navigation, route }: Props) => {
  const { id } = route?.params;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: BLACK }}>Call Screen</Text>
      <Pressable
        style={{
          marginTop: 100,
          backgroundColor: 'red',
          padding: 20,
          borderRadius: 20,
        }}
        onPress={() => navigation.navigate('VisitScreen', { id: id })}
      >
        <Icon name="phone-off" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default CallScreen;
