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
  Alert,
  Modal,
  BackHandler,
} from 'react-native';
import { ScaledSheet, s, scale } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input, useInputState } from '../../components/inputs/textInput';
import FastImage from 'react-native-fast-image';
import {
  BLACK,
  BLUE_COLOR,
  RED_COLOR,
  WHITE,
  WHITE_10,
  WHITE_40,
} from '../../util/color';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../util/styles';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { HomeStackScreenType } from '../../navigations/Stacks/homeStack';
import { addNewPatients, addNewVisit } from '../../store/reducer/visitReducer';
import { BlurView } from '@react-native-community/blur';
type StackProps = NativeStackScreenProps<HomeStackScreenType, 'VisitScreen'>;
type Props = StackProps;

const VisitScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { visits } = useAppSelector(state => state.visit);
  const data = visits.find(item => item.id === route.params.id);
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const name = useInputState('');
  const nic = useInputState('');
  const age = useInputState('');
  const gender = useInputState('');

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainHomeScreen');
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AllHeader
        title="Visit Details"
        back={() => navigation.navigate('MainHomeScreen')}
        navigate={() => navigation.navigate('HelpScreen')}
      />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: BLUE_COLOR,
            borderRadius: 20,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: scale(15),
            paddingVertical: scale(10),
          }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  flexBasis: '30%',
                  color: WHITE,
                  fontSize: scale(14),
                  textAlign: 'left',
                }}
              >
                LHV:
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                Saba Kanwal
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  flexBasis: '30%',
                  color: WHITE,
                  fontSize: scale(14),
                  textAlign: 'left',
                }}
              >
                Marvee:
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                {data?.marveeName}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  flexBasis: '30%',
                  color: WHITE,
                  fontSize: scale(14),
                  textAlign: 'left',
                }}
              >
                District:
              </Text>

              <Text
                style={{
                  color: WHITE,
                  fontSize: scale(16),
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                {data?.district}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  flexBasis: '30%',
                  color: WHITE,
                  fontSize: scale(14),
                  textAlign: 'left',
                }}
              >
                Area:
              </Text>

              <Text
                style={{
                  color: WHITE,
                  fontSize: scale(16),
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                {data?.area}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: scale(5),
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#333333',
              marginHorizontal: scale(2),
              paddingHorizontal: scale(15),
              paddingVertical: scale(5),
              borderRadius: 10,
            }}
          >
            <Text
              style={{ color: WHITE, fontSize: scale(12), textAlign: 'center' }}
            >
              LHV’s Earning
            </Text>
            <Text
              style={{
                color: WHITE,
                fontSize: scale(14),
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              10,000
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#333333',
              marginHorizontal: scale(2),
              paddingHorizontal: scale(15),
              paddingVertical: scale(5),
              borderRadius: 10,
            }}
          >
            <Text
              style={{ color: WHITE, fontSize: scale(12), textAlign: 'center' }}
            >
              Marvee Comission
            </Text>
            <Text
              style={{
                color: WHITE,
                fontSize: scale(14),
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              5,000
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#333333',
              marginHorizontal: scale(2),
              paddingHorizontal: scale(15),
              paddingVertical: scale(5),
              borderRadius: 10,
            }}
          >
            <Text
              style={{ color: WHITE, fontSize: scale(12), textAlign: 'center' }}
            >
              Patients
            </Text>
            <Text
              style={{
                color: WHITE,
                fontSize: scale(14),
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {data?.patients ? data?.patients?.length : 0}
            </Text>
          </View>
        </View>
        <ScrollView>
          {data?.patients &&
            data?.patients?.map((item, index) => (
              <View
                key={item.id}
                style={{
                  borderColor: 'balck',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: scale(3),
                }}
              >
                <View
                  style={{
                    backgroundColor: RED_COLOR,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    padding: scale(15),
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: WHITE,
                        fontSize: scale(20),
                      }}
                    >
                      {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: WHITE, fontSize: scale(12) }}>
                        {item.age} Years
                      </Text>
                      <View
                        style={{
                          borderLeftWidth: 1,
                          borderLeftColor: WHITE,
                          marginHorizontal: 9,
                        }}
                      />
                      <Text style={{ color: WHITE, fontSize: scale(12) }}>
                        {item.gender}
                      </Text>
                      <View
                        style={{
                          borderLeftWidth: 1,
                          borderLeftColor: WHITE,
                          marginHorizontal: 9,
                        }}
                      />
                      <Text style={{ color: WHITE, fontSize: scale(12) }}>
                        {item.nic}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ padding: scale(10) }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    {item.report?.map((item, index) => (
                      <View
                        key={index}
                        style={{ flexBasis: '23%', marginHorizontal: 5 }}
                      >
                        <Text
                          style={{
                            color: BLACK,
                            fontSize: scale(14),
                            textAlign: 'center',
                          }}
                        >
                          {item.name}
                        </Text>
                        <Pressable
                          style={{
                            borderWidth: 2,
                            borderColor: '#939393',
                            padding: scale(4),
                            borderRadius: 15,
                          }}
                        >
                          <Text
                            style={{
                              color: BLACK,
                              fontSize: scale(8),
                              textAlign: 'center',
                            }}
                          >
                            View Image
                          </Text>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                  <View
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'black',
                      flexDirection: 'row',
                      paddingVertical: scale(3),
                      marginVertical: scale(10),
                    }}
                  >
                    {item.symptoms?.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          padding: scale(10),
                          borderRadius: 10,
                          backgroundColor: WHITE_10,
                          marginHorizontal: 10,
                        }}
                      >
                        <Text style={{ color: BLACK, fontSize: scale(14) }}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text style={{ color: BLACK, fontSize: scale(14) }}>
                    {item.comments}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: scale(16),
                      color: BLACK,
                      marginVertical: scale(5),
                    }}
                  >
                    Prescription
                  </Text>
                  {item.prescription?.map(p => (
                    <View
                      key={p.id}
                      style={{
                        flexDirection: 'row',
                        borderRadius: 10,
                        paddingVertical: scale(10),
                        paddingHorizontal: scale(4),
                        alignItems: 'center',
                        marginVertical: scale(2),
                        borderWidth: 1,
                        borderColor: BLACK,
                      }}
                    >
                      <Text style={{ color: BLACK, flexBasis: '50%' }}>
                        {p.name}
                      </Text>
                      <View style={{ flexDirection: 'row', flexBasis: '20%' }}>
                        <Text style={{ color: BLACK }}>{p.qty}</Text>
                      </View>

                      <Text style={{ color: BLACK }}>{p.time}</Text>
                    </View>
                  ))}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: scale(16),
                      color: BLACK,
                      marginVertical: scale(5),
                    }}
                  >
                    Instructions? (if any)
                  </Text>
                  <Text style={{ color: BLACK, fontSize: scale(14) }}>
                    {item.instruction}
                  </Text>
                  {/* <Text style={{ fontWeight: "bold", fontSize: scale(16), color: BLACK, marginVertical: scale(5) }}>Lab Tests (if any)</Text>
                            <Text style={{ color: BLACK, fontSize: scale(14) }}>{item.}</Text> */}
                </View>
              </View>
            ))}
        </ScrollView>
        <Modal animationType="slide" transparent={true} visible={visible}>
          {/* <BlurView style={styles.absolute} blurType='dark' blurAmount={10} reducedTransparencyFallbackColor="white"> */}
          <View style={styles.modalContent}>
            <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  color: BLACK,
                  fontSize: scale(16),
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                Add New Patient
              </Text>
              <Pressable
                onPress={onClose}
                style={{ alignSelf: 'flex-end', padding: 10 }}
              >
                <MaterialIcons name="close" color="black" size={22} />
              </Pressable>
            </View>
            <Input
              inputState={name}
              label={null}
              placeholder="Enter Patient Name"
            />
            <Input
              inputState={nic}
              inputMode="numeric"
              keyboardType="number-pad"
              maxLength={13}
              label={null}
              placeholder="Enter CNIC "
            />
            <Input
              inputState={age}
              inputMode="numeric"
              keyboardType="number-pad"
              label={null}
              placeholder="Enter Age"
            />
            <Input
              inputState={gender}
              label={null}
              placeholder="Enter Gender"
            />
            <Pressable
              onPress={() => {
                if (
                  name.value === '' ||
                  nic.value === '' ||
                  age.value === '' ||
                  gender.value === ''
                ) {
                  console.log(name.value, nic.value, age.value, gender.value);
                  Alert.alert('Please fill all the fields');
                  return;
                }
                onClose();
                navigation.navigate('AddPaitentDetail', {
                  name: name.value as unknown as string,
                  nic: nic.value as unknown as string,
                  age: age.value as unknown as string,
                  gender: gender.value as unknown as string,
                  visitId: route.params.id,
                });
              }}
              style={[GlobalStyle.filedButton]}
            >
              <Text style={GlobalStyle.filedButtonText}>Submit</Text>
            </Pressable>
          </View>
          {/* </BlurView> */}
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default VisitScreen;

const styles = ScaledSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: '50@s',
    // height:Dimensions.get('screen').height
  },
  modalContent: {
    height: '30%',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    position: 'absolute',
    top: '25%',
    padding: 10,
  },
});
