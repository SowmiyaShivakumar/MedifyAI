import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc } from 'firebase/firestore';
import  { app, auth }  from '../config'
import { doc } from 'firebase/firestore';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import AwesomeAlert from 'react-native-awesome-alerts'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UIcon  from 'react-native-vector-icons/FontAwesome';
const SignUp = ({ navigation }) => {
    const db = getFirestore(app);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)

    function createUser(){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
            const user = userCred.user;
            const userDoc = doc(db, 'users', user.uid)
            const udata = {
                username: username,
                email: email
            }
            setDoc(userDoc, udata)
            .then(()=>{
                console.log('Data submitted')
                setAlert(true);
            })
            .catch((e) => {
                    console.log(e);
            })
        })
        
    }
    const hideAlert = () => {
        setAlert(false); // Hide AwesomeAlert
        navigation.navigate('Details')
    };
  return (
    <View style={styles.container}>
           <View style={styles.topImgView}>
                <Image source={require('../assets/images/signTop.png')} style={styles.topImg}/>
            </View>
            <View>
                <Text style={styles.headingText}>Welcome</Text>
            </View>
            <View>
                <Text style={styles.subheadText}>Sign up to continue</Text>
            </View>
            <View style={styles.inputView}>
                <UIcon name='user' size={20} color={'#9A9A9A'} style={{marginLeft: 8, marginTop: 13}}/>
                <TextInput style={styles.input}
                    onChangeText={(username)=>setUsername(username)}
                    value={username}
                    placeholder='Username'
                />
            </View>
            <View style={styles.inputView}>
            <Icons name='email' size={20} color={'#9A9A9A'} style={{marginLeft: 8, marginTop: 13}}/>
                <TextInput style={styles.input}
                    onChangeText={(email)=>setEmail(email)}
                    value={email}
                    placeholder='Email'
                />
            </View>
            <View style={styles.inputView}>
            <Icon name='lock' size={22} color={'#9A9A9A'} style={{marginLeft: 8, marginTop: 10}}/>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={(password)=>setPassword(password)}
                    placeholder='Password'
                    secureTextEntry
                />
            </View>
            
            <View style={styles.loginBtn}>
                <Pressable style={styles.btn}
                    onPress={createUser}
                >
                    <Text style={styles.btnText}>Create</Text>
                </Pressable>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.bottomText}>Already an user?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.signup}> Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Image source={require('../assets/images/signBottom.png')} style={{marginTop: 30, marginLeft: 280}}/>
            </View>
            <AwesomeAlert
            show={alert}
            showProgress={false}
            title="Success"
            message="Registration successful! Kindly fill the following details to continue"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#3CB043"
            onConfirmPressed={hideAlert}
            alertContainerStyle={styles.alertContainer}
            titleStyle={styles.alertTitle}
            messageStyle={styles.alertMessage}
            confirmButtonTextStyle={styles.confirmBtn}
        />
    </View>
            
  )
}

const styles = StyleSheet.create({
     container:{
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    topImgView:{
        maxWidth: '100%'
    },
    topImg:{
        width: '100%',
        height: 190
    },
    
    headingText:{
        marginTop: -11,
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '600',
        color: '#262626'
    },
    subheadText:{
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18,
        marginBottom: 20
    },
    inputView:{
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        marginHorizontal: 30,
        elevation: 10,
        marginVertical: 15
    },
    input:{
        flex: 1,
        marginLeft: 5,
        color: 'black'
    },
    forgotPwd:{
        color: '#262626',
        textAlign: 'right',
        fontSize: 15,
        marginRight: 38
    },
    loginBtn:{
        justifyContent: 'center',
        marginVertical: 20
    },
    btn:{
        marginHorizontal: 30,
        marginLeft: 80,
        width: 200,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#87CEEB',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        fontSize: 23,
        fontWeight: '500',
        color: '#000000'
    },
    bottom:{
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomText:{
        color: 'black',
        fontWeight: "semibold",
        fontSize: 18
    },
    signup:{
        fontWeight: "semibold",
        color: '#EA1DC2',
        fontSize: 18
    },
    alertContainer: {
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
    },
    alertTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#028A0F',
        textAlign: 'center',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 18,
        color: '#333333',
        textAlign: 'center',
        marginBottom: 20,
    },
    confirmBtn:{
        fontSize: 20, 
        fontWeight: '600',
        textAlign: 'center'
    }
})

export default SignUp;