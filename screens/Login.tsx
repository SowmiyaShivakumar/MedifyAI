import { View, Text, Image, TouchableOpacity, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config'
import AwesomeAlert from 'react-native-awesome-alerts';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, showError] = useState(false)
    function login(){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCred)=>{
            navigation.navigate('BottomTabs')
        }).catch((e)=>{
            console.log('Error:',e);
            showError(true);
        })
    }
    const hideError = ()=>{
        showError(false);
        navigation.navigate('Login')
    }
  return (
    <View style={styles.container}>
    <View style={styles.topImgView}>
         <Image source={require('../assets/images/Ellipse.png')} style={styles.topImg}/>
     </View>
     <View>
         <Text style={styles.headingText}>Welcome Back</Text>
     </View>
     <View>
         <Text style={styles.subheadText}>Sign in to your account</Text>
     </View>
     <View style={styles.inputView}>
         <Icons name='email' size={20} color={'#9A9A9A'} style={{marginLeft: 8, marginTop: 10}}/>
         <TextInput style={styles.input}
             placeholder='Email'
             value={email}
             onChangeText={(email) => setEmail(email)}
         />
     </View>
     <View style={styles.inputView}>
         <Icons name='lock' size={22} color={'#9A9A9A'} style={{marginLeft: 8, marginTop: 10}}/>
         <TextInput style={styles.input}
             placeholder='Password'
             secureTextEntry
             value={password}
             onChangeText={(password) => setPassword(password)}
         />
     </View>
     <Text style={styles.forgotPwd}>Forgot your password?</Text>
     <View style={styles.loginBtn}>
         <Pressable style={styles.btn}
             onPress={login}
         >
             <Text style={styles.btnText}>Login</Text>
         </Pressable>
     </View>
     <View style={styles.bottom}>
         <Text style={styles.bottomText}>Don't have an account?</Text>
         <TouchableOpacity
             onPress={() => navigation.navigate('SignUp')}
         >
             <Text style={styles.signup}> Create</Text>
         </TouchableOpacity>
     </View>
     <View>
         <Image source={require('../assets/images/bottom.png')} style={{maxWidth: '100%', marginTop: 30}}/>
     </View>
     <AwesomeAlert
                show={error}
                showProgress={false}
                title="Invalid Credentials"
                message="Kindly provide the correct details"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#E3242B"
                onConfirmPressed={hideError}
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
        marginTop: 7,
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
        marginVertical: 20
    },
    input:{
        flex: 1,
        marginLeft: 5
    },
    forgotPwd:{
        color: '#262626',
        textAlign: 'right',
        fontSize: 15,
        marginRight: 38
    },
    loginBtn:{
        justifyContent: 'center',
        // flexDirection: 'row',
        marginVertical: 25
    },
    btn:{
        marginHorizontal: 30,
        marginLeft: 80,
        width: 200,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'orange',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        fontSize: 23,
        fontWeight: '500',
        color: '#FFFFFF'
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
        color: '#87CEEB',
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
        color: 'red',
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
export default Login