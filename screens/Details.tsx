import { View, Text, StyleSheet, TextInput, Dimensions, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'
import { app } from '../config'
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';

const Details = ({ navigation }) => {
    const [userType, setUserType] = useState('')
    const [age, setAge] = useState('')
    const [bp, setBP] = useState('')
    const [diabetic, setDiabetic] = useState('')
    const [weight, setWt] = useState('')
    const [height, setHt] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [alert, setAlert] = useState(false);
    // Getting user details
    const db = getFirestore(app);
    const auth = getAuth();

    async function addUser() {
        const user = auth.currentUser;
        if (user) {
            const usid = user.uid;
            const docref = doc(db, "users", usid);
            console.log(usid);
            const data = {
                gender: userType,
                age: age,
                bloodPressure: bp,
                diabetic: diabetic,
                weight: weight,
                height: height,
                bloodType: bloodType
            }
            try {
                await updateDoc(docref, data)
                console.log('Added')
                setAlert(true);
            } catch (e) {
                console.log(e);
            }
        }
    }

    const hideAlert = () => {
        setAlert(false);
        navigation.navigate("BottomTabs");
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <Text style={styles.title}>Fill this to let us know about your health!!</Text>
            <View style={styles.ques1}>
                <Text style={styles.q1}>Gender</Text>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='male'
                        status={userType === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('male')}
                    />
                    <Text>Male</Text>
                </View>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='female'
                        status={userType === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('female')}
                    />
                    <Text>Female</Text>
                </View>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='others'
                        status={userType === 'others' ? 'checked' : 'unchecked'}
                        onPress={() => setUserType('others')}

                    />
                    <Text>Others</Text>
                </View>

            </View>
            <View style={styles.ques2}>
                <Text style={{ marginLeft: 10, fontSize: 15 }}>Age</Text>
                <View style={styles.inputView}>
                    <TextInput value={age}
                        placeholder='Enter you age'
                        keyboardType='numeric'
                        style={styles.ageText}
                        onChangeText={(age) => setAge(age)}
                    />
                </View>
            </View>

            <View style={styles.ques3}>
                <Text>Blood Pressure (BP)?</Text>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='yes'
                        status={bp === 'yes' ? 'checked' : 'unchecked'}
                        onPress={() => setBP('yes')}
                    />
                    <Text>Yes</Text>
                </View>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='no'
                        status={bp === 'no' ? 'checked' : 'unchecked'}
                        onPress={() => setBP('no')}
                    />
                    <Text>No</Text>
                </View>
            </View>

            <View style={styles.ques4}>
                <Text>Diabetic Person ?</Text>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='yes'
                        status={diabetic === 'yes' ? 'checked' : 'unchecked'}
                        onPress={() => setDiabetic('yes')}
                    />
                    <Text>Yes</Text>
                </View>
                <View style={styles.radioGrp}>
                    <RadioButton.Android
                        value='no'
                        status={diabetic === 'no' ? 'checked' : 'unchecked'}
                        onPress={() => setDiabetic('no')}
                    />
                    <Text>No</Text>
                </View>
            </View>

            <View style={styles.ques5}>
                <Text style={{ marginLeft: 10, fontSize: 15 }}>Weight</Text>
                <View style={styles.inputViewWt}>
                    <TextInput value={weight}
                        placeholder='Weight'
                        keyboardType='numeric'
                        style={styles.ageText}
                        onChangeText={(weight) => setWt(weight)}
                    />
                </View>
            </View>

            <View style={styles.ques6}>
                <Text style={{ marginLeft: 10, fontSize: 15 }}>Height</Text>
                <View style={styles.inputViewWt}>
                    <TextInput value={height}
                        placeholder='Height'
                        keyboardType='numeric'
                        style={styles.ageText}
                        onChangeText={(height) => setHt(height)}
                    />
                </View>
            </View>

            <View style={styles.ques7}>
                <Text style={{ marginLeft: 10, fontSize: 15 }}>Blood Type</Text>
                <View style={styles.inputView1}>
                    <TextInput value={bloodType}
                        placeholder='Blood Type'
                        style={styles.ageText}
                        onChangeText={(bloodType) => setBloodType(bloodType)}
                    />
                </View>
            </View>

            <View style={styles.loginBtn}>
                <Pressable style={styles.btn}
                    onPress={addUser}
                >
                    <Text style={styles.btnText}>Add</Text>
                </Pressable>
            </View>
            <View>
                <Image source={require('../assets/images/signBottom.png')} style={{ maxWidth: '100%', marginTop: -70, marginLeft: 280 }} />
            </View>

            <AwesomeAlert
            show={alert}
            showProgress={false}
            message="Thank you for filling the form!!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#21cadd"
            onConfirmPressed={hideAlert}
            alertContainerStyle={styles.alertContainer}
            messageStyle={styles.alertMessage}
            confirmButtonTextStyle={styles.confirmBtn}
        />
        </View>
    )
}
const styles = StyleSheet.create({
    ques1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        backgroundColor: '#F6D6D6',
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 20,
        marginLeft: 10,
        marginTop: 15
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        marginTop: 40,
        fontStyle: 'italic',
        fontFamily: 'monospace',
        fontWeight: 500,
        color: '#000'
    },
    q1: {
        fontSize: 15,
        fontWeight: 400
    },
    radioGrp: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ageText: {
        flex: 1,
        marginLeft: 5,
        color: '#000'
    },
    inputView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 80,
        elevation: 10,
        height: 37,
        width: 150
    },
    ques2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 40,
        marginLeft: 20,
        marginTop: 15,
        backgroundColor: "#FFE893",
        height: 50
    },
    ques3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 30,
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: "#BFECFF"
    },
    ques4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 30,
        marginLeft: 15,
        marginTop: 15,
        backgroundColor: "#D3EE98"
    },
    ques5: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 60,
        marginLeft: 30,
        marginTop: 15,
        backgroundColor: "#FFBE98"
    },
    ques6: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 60,
        marginLeft: 30,
        marginTop: 15,
        backgroundColor: "#FBFFE2"
    },
    ques7: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 18,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('screen').width - 40,
        marginLeft: 20,
        marginTop: 15,
        backgroundColor: "#FCF876"
    },
    inputView1: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 90,
        elevation: 10,
        marginVertical: 2,
        marginLeft: 48,
        width: 100
    },
    loginBtn: {
        justifyContent: 'center',
        marginVertical: 20,
    },
    btn: {
        marginHorizontal: 30,
        marginLeft: 130,
        width: 100,
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#daa520',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000'
    },
    btnText: {
        fontSize: 23,
        fontWeight: '500',
        color: 'white'
    },
    inputViewWt: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 15,
        marginHorizontal: 80,
        elevation: 10,
        marginLeft: 70,
        height: 37,
        width: 100
    },
    alertContainer: {
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
    alertMessage: {
        fontSize: 18,
        color: '#333333',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'cursive',
        fontWeight: "800"
    },
    confirmBtn:{
        fontSize: 20, 
        fontWeight: '600',
        textAlign: 'center'
    }
})
export default Details