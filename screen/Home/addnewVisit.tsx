import { useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, ScrollView, SafeAreaView, Button, Alert } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { AllHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Input, useInputState } from '../../components/inputs/textInput';
import FastImage from 'react-native-fast-image';
import { BLACK, BLUE_COLOR, GRAY, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import GlobalStyle from '../../util/styles';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { HomeStackScreenType } from '../../navigations/Stacks/homeStack';
import { addNewVisit } from '../../store/reducer/visitReducer';
type StackProps = NativeStackScreenProps<HomeStackScreenType, 'AddNewVisit'>;
type Props = StackProps

const AddNewVisit = ({ navigation }: Props) => {
    const dispatch = useAppDispatch()
    const { visits } = useAppSelector(state => state.visit)
    const marveeName = useInputState('')
    const district = useInputState('')
    const area = useInputState('')
    const number = useInputState('')


    return (
        <SafeAreaView style={styles.mainContainer}>
            <AllHeader title='Visit Details' back={() => navigation.goBack()} navigate={() => navigation.navigate('HelpScreen')} />
            <View style={styles.container}>
                <Input inputState={marveeName} maxLength={11} label={null} placeholder='Enter Marvee’s Name' placeholderTextColor={GRAY}/>
                <Input inputState={number} maxLength={11} label={null} placeholder='Enter Mobile Number' placeholderTextColor={GRAY}/>
                <Input inputState={district} maxLength={11} label={null} placeholder='Enter District' placeholderTextColor={GRAY}/>
                <Input inputState={area} maxLength={11} label={null} placeholder='Enter Area' placeholderTextColor={GRAY}/>
                <Pressable onPress={() => {
                    if (marveeName.value === '' || district.value === '' || area.value === '') {
                        Alert.alert('Please fill all the fields')
                        return
                    }
                    dispatch(addNewVisit({
                        id: visits.length + 1,
                        marveeName: marveeName.value as unknown as string,
                        district: district.value as unknown as string,
                        area: area.value as unknown as string,
                        date: new Date(),
                        patients:[]
                    }))
                    // navigation.navigate('VisitScreen',{id:visits.length + 1})
                    navigation.navigate('MainHomeScreen')
                }} style={[GlobalStyle.filedButton]}>
                    <Text style={GlobalStyle.filedButtonText}>Submit</Text>
                </Pressable>
                <Image source={require('../../assets/png/addnewvisit.png')} style={{ width: scale(340), height: scale(340),marginVertical:scale(10),alignSelf:"center" }} />
            </View>
        </SafeAreaView>
    );
};

export default AddNewVisit;

const styles = ScaledSheet.create({
    mainContainer: {
        // flex: 1,
        backgroundColor: '#fff',
        height: Dimensions.get('screen').height
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
    },
    container: {
        width: "90%",
        backgroundColor: '#fff',
        alignSelf: "center",
        marginTop: '50@s'
        // height:Dimensions.get('screen').height
    },
});
