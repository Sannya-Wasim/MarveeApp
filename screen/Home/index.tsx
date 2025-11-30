import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { MainScreenHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Input, useInputState } from '../../components/inputs/textInput';
import {
  BLACK,
  BLUE_COLOR,
  RED_COLOR,
  WHITE,
  WHITE_10,
} from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from '../../util/styles';
import { useAppSelector } from '../../store/hook';
import { HomeStackScreenType } from '../../navigations/Stacks/homeStack';
import { config } from '../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Appointments from './components/Appointments';
import { useApi } from '../../methods/apiClient';
import { endpoints } from '../../methods/endpoints';

type StackProps = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'>;
type Props = StackProps;
const HomeScreen = ({ navigation }: Props) => {
  const toggleDrawer = () => {};
  const { visits } = useAppSelector(state => state.visit);
  const [appoints, setAppoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const {POST} = useApi()

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append('lhvId', '1547');
      const res = await POST(endpoints?.getAppointments, formdata);
      if (res.status) {
        console.log('Successfully fetched appointments', res?.data);
        setAppoints(res?.data?.data);
      } else {
        console.log('Failed to fetch appointments', res?.message);
      }
    } catch (error) {
      console.log('Error fetching appointments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainScreenHeader toggleDrawer={toggleDrawer} walletNav={() => {}} />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: BLUE_COLOR,
            flexDirection: 'row',
            height: scale(100),
            padding: scale(5),
            marginTop: scale(60),
            borderRadius: scale(5),
          }}
        >
          <View style={{ flexBasis: '60%', padding: scale(10) }}>
            <Text
              style={{ color: WHITE, fontSize: scale(16), fontWeight: 'bold' }}
            >
              {user?.name}
            </Text>
            <Text style={{ color: WHITE, fontSize: scale(14) }}>LHV</Text>
          </View>
          <Image
            source={require('../../assets/png/marvee.png')}
            style={{
              width: scale(135),
              height: scale(153),
              borderRadius: scale(5),
              position: 'absolute',
              bottom: scale(10),
              right: scale(10),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: scale(20),
          }}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: scale(5),
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(238,33,37,0.3)',
                height: scale(50),
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(100),
              }}
            >
              <Icon name="calendar" size={scale(25)} color={RED_COLOR} />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              24 Years
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Age
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: scale(5),
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(11,149,122,0.3)',
                height: scale(50),
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(100),
              }}
            >
              <Icon name="award" size={scale(25)} color={'#0B957A'} />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              04 Years
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Experience
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              marginHorizontal: scale(5),
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(233,133,3,0.3)',
                height: scale(50),
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(100),
              }}
            >
              <MaterialIcon
                name="emoji-emotions"
                size={scale(25)}
                color={'#E97103'}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              155+
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Patients
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: scale(5),
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(18,86,161,0.3)',
                height: scale(50),
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: scale(100),
              }}
            >
              <FAIcon name="money-bill" size={scale(25)} color="#0D5495" />
            </View>
            <Text
              style={{
                textAlign: 'center',
                color: BLACK,
                fontSize: scale(14),
                fontWeight: 'bold',
              }}
            >
              18,000
            </Text>
            <Text
              style={{ textAlign: 'center', color: BLACK, fontSize: scale(8) }}
            >
              Sales
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: scale(20),
              color: BLACK,
              fontWeight: 'bold',
            }}
          >
            My Appointments
          </Text>
          <Pressable
            style={{
              backgroundColor: RED_COLOR,
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('AddNewVisit')}
          >
            <Icon name="plus" color={WHITE} size={20} />
          </Pressable>
        </View>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Pressable
            onPress={() => navigation.navigate('AddNewVisit')}
            style={[
              GlobalStyle.filedButton,
              {
                flexBasis: '48%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems : 'center'
              },
            ]}
          >
            <Icon name="plus" size={scale(20)} color={WHITE} />
            <Text style={GlobalStyle.filedButtonText}>Start New Visit</Text>
          </Pressable>
          <Pressable
            style={[
              GlobalStyle.outlinedButton,
              {
                flexBasis: '48%',
                flexDirection: 'row',
                justifyContent: 'center',
              },
            ]}
          >
            <Text style={GlobalStyle.outlinedButtonText}>Visits</Text>
          </Pressable>
        </View> */}

          {loading ? <ActivityIndicator size={'small'} color={RED_COLOR}/> :         <Appointments data={appoints} navigation={navigation} />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '50@s',
    // height:Dimensions.get('screen').height
  },
});
