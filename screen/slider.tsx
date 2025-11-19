import { useState } from 'react';
import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import { ScaledSheet, scale, } from 'react-native-size-matters';
import { useAppDispatch } from '../store/hook';
import { setSliderShown } from '../store/reducer/authReducer';

const SliderScreen = () => {
    const dispatch = useAppDispatch()
    const [index, setIndex] = useState(0)
    const [images, setImages] = useState([require('../assets/png/firstScreen.png'), require('../assets/png/secondSlider.png'), require('../assets/png/thirdSlider.png')])
    const [heading, setHeading] = useState([
        <Text style={styles.heading}>
            Seamless <Text style={styles.headingColor}>
                Doctor
                Appointments!
            </Text>
        </Text>,
        <Text style={styles.heading}>
            Effortless <Text style={styles.headingColor}>
                Lab Test Bookings!
            </Text>
        </Text>,
        <Text style={styles.heading}>
            Your <Text style={styles.headingColor}>
                Health,
            </Text> Your Way!
        </Text>
    ])
    const [subText, setSubText] = useState(["Easily book appointments with top-notch doctors, specialists, and healthcare providers in just a few taps.", "Schedule lab tests and access quick results with convenience.", "Order medications from the pharmacy and book skilled nurses for at-home care."])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image source={images[index]} style={styles.image} resizeMode='stretch' />
                <View style={styles.subContainer}>
                    {heading[index]}
                    <Text style={styles.subText}>{subText[index]}</Text>
                    <View style={{ flexDirection: "row", marginVertical: scale(10) }}>
                        <Pressable style={index == 0 ? styles.roundRed : styles.round} onPress={()=>setIndex(0)} />
                        <Pressable style={index == 1 ? styles.roundRed : styles.round} onPress={()=>setIndex(1)}/>
                        <Pressable style={index == 2 ? styles.roundRed : styles.round} onPress={()=>setIndex(2)}/>
                    </View>

                </View>
                {index <=1 &&<Pressable style={styles.filedButton} onPress={()=>setIndex(index+1)}>
                    <Text style={styles.filedButtonText}>Next</Text>
                </Pressable>}
                {index >1 &&<Pressable style={styles.filedButton} onPress={()=>dispatch(setSliderShown())}>
                    <Text style={styles.filedButtonText}>Get Started</Text>
                </Pressable>}
                {index <=1&&<Pressable style={styles.outlinedButton} onPress={()=>dispatch(setSliderShown())}>
                    <Text style={styles.outlinedButtonText}>Skip</Text>
                </Pressable>}
            </View>

        </View>
    );
};

export default SliderScreen;

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: "90%",
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        width: "80%",
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: "320@s",
        width: "290@s",
        marginVertical: "10@s"
    },
    heading: {
        fontSize: '24@s',
        fontWeight: "bold",
        color: "black",
        marginVertical: "10@s",
        textAlign: "center"
    },
    headingColor: {
        color: "#BC1817",
        marginHorizontal: '3@s',
        textAlign: "center"

    },
    subText: {
        fontSize: "14@s",
        color: "black",
        marginVertical: "10@s",
        textAlign: "center"
    },
    round: {
        width: "10@s",
        height: '10@s',
        backgroundColor: "#E3E3E3",
        borderRadius: 100,
        marginHorizontal: "10@s"
    },
    roundRed: {
        width: "10@s",
        height: '10@s',
        backgroundColor: "#BC1817",
        borderRadius: 100,
        marginHorizontal: "10@s"
    },
    filedButton: {
        padding: '10@s',
        backgroundColor: "#BC1817",
        width: "100%",
        borderRadius: '3@s',
        marginVertical: '3@s'
    },
    filedButtonText: {
        color: "#fff",
        textAlign: "center"
    },
    outlinedButton: {
        padding: '10@s',
        borderWidth: '1@s',
        borderColor: "#070707",
        width: "100%",
        borderRadius: '3@s',
        marginVertical: '3@s'
    },
    outlinedButtonText: {
        color: "#070707",
        textAlign: "center"
    }
});
