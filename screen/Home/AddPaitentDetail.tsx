import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, ScrollView, SafeAreaView, Button, Alert, Modal, TextInput } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Input, useInputState } from '../../components/inputs/textInput';
import FastImage from 'react-native-fast-image';
import { BLACK, BLUE_COLOR, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import GlobalStyle from '../../util/styles';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { HomeStackScreenType } from '../../navigations/Stacks/homeStack';
import { addNewPatients, addNewVisit } from '../../store/reducer/visitReducer';
import { BlurView } from '@react-native-community/blur';
import * as ImagePicker from 'react-native-image-picker';
type StackProps = NativeStackScreenProps<HomeStackScreenType, 'AddPaitentDetail'>;
type Props = StackProps

const AddPaitentDetail = ({ navigation, route }: Props) => {
    const dispatch = useAppDispatch()
    const { visits } = useAppSelector(state => state.visit)
    const patients = visits.find(visit => visit.id === route.params.visitId)?.patients
    const param = route.params
    const symptoms = useInputState('')
    const comment = useInputState('')
    const labtest = useInputState('')
    const instructions = useInputState('')
    const [response, setResponse] = useState<any>(null);
    const [labId, setLabId] = useState<any>('')
    const [test, setTest] = useState<{
        id: any,
        name: string,
        image: any,
    }[]>([{
        id: "1",
        name: "",
        image: null,
    }])
    useEffect(() => {
        if (response && labId !== "") {
            setTest(prev => prev.map((item) => {
                if (item.id === labId) {
                    return {
                        ...item,
                        image: response
                    }
                }
                return item
            }))
            setResponse(null)
            setLabId('')
        }
    }, [response])
    const [prescription, setPrecsription] = useState<{
        id: any,
        name: string,
        qty: string,
        time: string
    }[]
    >([{
        id: "1",
        name: "",
        qty: "0",
        time: "Before Food"
    }])

    const onButtonPress = useCallback((type: String, options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions) => {
        if (type === 'capture') {
            ImagePicker.launchCamera(options, setResponse);
        } else {
            ImagePicker.launchImageLibrary(options, setResponse);
        }
    }, []);


    const submit = () => {
        dispatch(addNewPatients({
            id: patients ? String(patients.length + 1) :String(Math.random()*1000000),
            visitId: param.visitId,
            name: param.name,
            emr: null,
            nic: param.nic,
            age: Number(param.age),
            gender: param.gender,
            symptoms: symptoms.value ? symptoms.value.split(',') : null,
            comments: comment.value as unknown as string,
            instruction: instructions.value as unknown as string,
            prescription: prescription,
            report:test

        }))
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AllHeader title='Visit Details' back={() => navigation.goBack()} navigate={() => navigation.navigate('HelpScreen')} />
            <ScrollView style={styles.container}>
                <View style={{ borderColor: "balck", borderWidth: 1, borderRadius: 10, }}>
                    <View style={{ backgroundColor: RED_COLOR, borderTopRightRadius: 10, borderTopLeftRadius: 10, padding: scale(15) }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: WHITE, fontSize: scale(20) }}>
                                {param.name}
                            </Text>
                            <View style={{ flexDirection: "row", }}>
                                <Text style={{ color: WHITE, fontSize: scale(16) }}>
                                    {param.age} Years
                                </Text>
                                <View style={{ borderLeftWidth: 1, borderLeftColor: WHITE, marginHorizontal: 4 }} />
                                <Text style={{ color: WHITE, fontSize: scale(16), }}>
                                    {param.gender.toLocaleUpperCase()}
                                </Text>
                                <View style={{ borderLeftWidth: 1, borderLeftColor: WHITE, marginHorizontal: 4 }} />
                                <Text style={{ color: WHITE, fontSize: scale(16), }}>
                                    {param.nic}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ padding: scale(15), backgroundColor: WHITE, borderRadius: 10 }}>
                        <Input inputState={symptoms} label={null} placeholder='Please Enter Symptoms (,) comma seprate' />
                        <Input inputState={comment} label={null} placeholder='Please Enter Comments' />

                        <Input inputState={labtest} label={"Instructions? (if any)"} placeholder='Please Enter Lab Test' />
                        <Input inputState={instructions} label={"Lab Tests (if any)"} placeholder='Please Enter Instructions' />
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: BLACK, fontSize: scale(16), fontWeight: "bold", marginVertical: scale(2) }}>
                                Prescription (if any)
                            </Text>
                            <Pressable onPress={() => setPrecsription([...prescription, {
                                id: String(prescription.length + 1),
                                name: "",
                                qty: "0",
                                time: "Before Food"
                            }])} style={{ alignSelf: "center", marginLeft: "auto" }}>
                                <Icon name="plus" color={BLACK} size={scale(20)} />
                            </Pressable>
                        </View>
                        {
                            prescription.map((item, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginVertical: scale(2), borderWidth: 1, borderColor: BLACK }}>
                                    <TextInput style={{ flexBasis: "50%" }} placeholder='Enter Medicine Name' value={item.name} onChangeText={(text) => setPrecsription(prev => prev.map(p => p.id === item.id ? { ...p, name: text } : p))} />
                                    <View style={{ flexDirection: "row", flexBasis: "20%" }}>
                                        <Pressable onPress={() => Number(item.qty) > 0 ? setPrecsription(prev => prev.map(p => p.id === item.id ? {
                                            ...p,
                                            qty: String(Number(p.qty) - 1)
                                        } : p)) : 0}>
                                            <Icon name="minus" color={BLACK} size={scale(20)} />
                                        </Pressable>
                                        <Text style={{ color: BLACK }}>{item.qty}</Text>
                                        <Pressable onPress={() => Number(item.qty) > 0 ? setPrecsription(prev => prev.map(p => p.id === item.id ? {
                                            ...p,
                                            qty: String(Number(p.qty) + 1)
                                        } : p)) : 0}>
                                            <Icon name="plus" color={BLACK} size={scale(20)} />
                                        </Pressable>

                                    </View>
                                    <Pressable style={{ flexBasis: "30%" }} onPress={() => setPrecsription(prev => prev.map(p => p.id === item.id ? {
                                        ...p,
                                        time: item.time === "Before Food" ? "After Food" : "Before Food"
                                    } : p))}>
                                        <Text style={{ color: BLACK }}>{item.time}</Text>
                                    </Pressable>
                                </View>
                            ))
                        }
                        <View style={{ flexDirection: "row", marginVertical: scale(2) }}>
                            <Text style={{ color: BLACK, fontSize: scale(16), fontWeight: "bold", marginVertical: scale(10) }}>
                                Reports
                            </Text>
                            <Pressable onPress={() => setTest([...test, {
                                id: String(test.length + 1),
                                name: "",
                                image: null
                            }])} style={{ alignSelf: "center", marginLeft: "auto" }}>
                                <Icon name="plus" color={BLACK} size={scale(20)} />
                            </Pressable>
                        </View>
                        {
                            test.map((item, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginVertical: scale(2), borderWidth: 1, borderColor: BLACK }}>
                                    <TextInput style={{ flexBasis: "50%" }} placeholder='Enter Report Name' value={item.name} onChangeText={(text) => setTest(prev => prev.map(p => p.id === item.id ? { ...p, name: text } : p))} />
                                    <Pressable style={{ flexBasis: "50%" }} onPress={() => {
                                        setLabId(item.id)
                                        onButtonPress("capture", {
                                            selectionLimit: 0,
                                            mediaType: 'photo',
                                            includeBase64: false,
                                            includeExtra: true,
                                        })
                                    }}>
                                        <Text style={{ color: BLACK, fontSize: scale(16) }}>
                                            {item.image ? "Uploaded" : "Upload Report"}
                                        </Text>
                                    </Pressable>
                                </View>
                            ))
                        }
                         <Pressable onPress={submit} style={[GlobalStyle.filedButton]}>
                            <Text style={GlobalStyle.filedButtonText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default AddPaitentDetail;

const styles = ScaledSheet.create({
    mainContainer: {
        // flex: 1,
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height
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
        width: "90%",
        backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: '50@s'
        // height:Dimensions.get('screen').height
    },
    modalContent: {
        height: '30%',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
        position: 'absolute',
        top: "25%",
        padding: 10,
    },
});
