import { useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, ScrollView, SafeAreaView, Button } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { MainScreenHeader } from '../../components/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import { Input, useInputState } from '../../components/inputs/textInput';
import FastImage from 'react-native-fast-image';
import { BLACK, BLUE_COLOR, RED_COLOR, WHITE, WHITE_10 } from '../../util/color';
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import GlobalStyle from '../../util/styles';
import { useAppSelector } from '../../store/hook';
import { HomeStackScreenType } from '../../navigations/Stacks/homeStack';
type StackProps = NativeStackScreenProps<HomeStackScreenType, 'MainHomeScreen'>;
type Props = StackProps 
const HomeScreen = ({navigation}:Props) => {
    const toggleDrawer = () => { }
    const { visits } = useAppSelector(state => state.visit)


    return (
        <SafeAreaView style={styles.mainContainer}>
            <MainScreenHeader toggleDrawer={toggleDrawer} walletNav={() => { }} />
            <View style={styles.container}>
                <View style={{ backgroundColor: BLUE_COLOR, flexDirection: "row", height: scale(100), padding: scale(5), marginTop: scale(60), borderRadius: scale(5), }}>
                    <View style={{ flexBasis: '60%', padding: scale(10) }}>
                        <Text style={{ color: WHITE, fontSize: scale(16), fontWeight: 'bold' }}>Saba Kanwal</Text>
                        <Text style={{ color: WHITE, fontSize: scale(14) }}>LHV</Text>
                    </View>
                    <Image source={require('../../assets/png/marvee.png')} style={{ width: scale(135), height: scale(153), borderRadius: scale(5), position: 'absolute', bottom: scale(10), right: scale(10) }} />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: scale(20) }}>
                    <View style={{ flex: 1, marginHorizontal: scale(5), justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: 'rgba(238,33,37,0.3)', height: scale(50), width: (60), alignItems: "center", justifyContent: "center", borderRadius: scale(100) }}>
                            <Icon name="calendar" size={scale(25)} color={RED_COLOR} />
                        </View>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>24 Years</Text>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Age</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: scale(5), justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: 'rgba(11,149,122,0.3)', height: scale(50), width: (60), alignItems: "center", justifyContent: "center", borderRadius: scale(100) }}>
                            <Icon name="award" size={scale(25)} color={'#0B957A'} />
                        </View>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>04 Years</Text>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Experience</Text>
                    </View>

                    <View style={{ flex: 1, marginHorizontal: scale(5), justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: 'rgba(233,133,3,0.3)', height: scale(50), width: (60), alignItems: "center", justifyContent: "center", borderRadius: scale(100) }}>
                            <MaterialIcon name="emoticon-happy-outline" size={scale(25)} color={'#E97103'} />
                        </View>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>155+</Text>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Patients</Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: scale(5), justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                        <View style={{ backgroundColor: 'rgba(18,86,161,0.3)', height: scale(50), width: (60), alignItems: "center", justifyContent: "center", borderRadius: scale(100) }}>
                            <MaterialIcon name="cash" size={scale(25)} color={'#0D5495'} />
                        </View>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(14), fontWeight: 'bold' }}>18,000</Text>
                        <Text style={{ textAlign: "center", color: BLACK, fontSize: scale(8) }}>Sales</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Pressable onPress={()=>navigation.navigate('AddNewVisit')} style={[GlobalStyle.filedButton, { flexBasis: "48%", flexDirection: "row", justifyContent: "center" }]}>
                        <Icon name="plus" size={scale(20)} color={WHITE} />
                        <Text style={GlobalStyle.filedButtonText}>Start New Visit</Text>
                    </Pressable>
                    <Pressable style={[GlobalStyle.outlinedButton, { flexBasis: "48%", flexDirection: "row", justifyContent: "center" }]}>
                        <Text style={GlobalStyle.outlinedButtonText}>Visits</Text>
                    </Pressable>
                </View>

                {visits.map((v,i) => <View key={i} style={{ backgroundColor: WHITE_10, borderRadius: scale(10), padding: 10,marginVertical:20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: scale(10), borderBottomWidth: 1, borderBottomColor: BLACK }}>
                        <Text style={{ fontSize: scale(20), color: BLACK, fontWeight: "bold" }}>Ongoing Visit</Text>
                        <Text style={{ fontSize: scale(15), color: BLACK }}>Date: {new Date(v.date).toLocaleDateString()}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: scale(10), flexWrap: "wrap", padding: scale(8) }}>
                        <View style={{ flexBasis: "100%", flexDirection: "row", }}>
                            <Text style={{ fontSize: scale(15), color: BLACK, fontWeight: "bold", marginRight: scale(5) }}>Marvee:</Text>
                            <Text style={{ fontSize: scale(15), color: BLACK }}>{v.marveeName}</Text>
                        </View>
                        <View style={{ flexBasis: "100%", flexDirection: "row" }}>
                            <Text style={{ fontSize: scale(15), color: BLACK, fontWeight: "bold", marginRight: scale(5) }}>Area:</Text>
                            <Text style={{ fontSize: scale(15), color: BLACK }}>{v.marveeName}</Text>
                        </View>
                        {/* <View style={{ flexBasis: "100%", flexDirection: "row", }}>
                            <Text style={{ fontSize: scale(15), color: BLACK, fontWeight: "bold", marginRight: scale(5) }}>Purpose of Visit:</Text>
                            <Text style={{ fontSize: scale(15), color: BLACK }}>Purpose goes here!</Text>
                        </View> */}
                        <View style={{ flexBasis: "100%", flexDirection: "row" }}>
                            <Text style={{ fontSize: scale(15), color: BLACK, fontWeight: "bold", marginRight: scale(5) }}>Patients Checked:</Text>
                            <Text style={{ fontSize: scale(15), color: BLACK, fontWeight: "bold", }}>{v.patients?.length||0}</Text>
                        </View>

                    </View>
                    <View style={{ borderTopWidth: 1, borderTopColor: BLACK, flexDirection: "row", justifyContent: "space-between" }}>
                        <Pressable onPress={()=>navigation.navigate('VisitScreen',{id:v.id})} style={[GlobalStyle.filedButton, { backgroundColor: "#00953C", flexDirection: "row", justifyContent: "center", flexBasis: "48%" }]}>
                            <Icon name='plus' color={WHITE} size={20} />
                            <Text style={GlobalStyle.filedButtonText}>Consult Patient</Text>
                        </Pressable>
                        <Pressable style={[GlobalStyle.filedButton, { flexDirection: "row", justifyContent: "center", flexBasis: "48%" }]}>
                            <Icon name='x' color={WHITE} size={20} />
                            <Text style={GlobalStyle.filedButtonText}>End Visit</Text>
                        </Pressable>
                    </View>
                </View>)}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

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
