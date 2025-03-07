import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'


const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topImgView}>
        <Image source={require('../assets/images/mainTop.png')} style={styles.topImg} />
      </View>
      <View style={styles.headView}>
        <Text style={styles.h1}>MEDIFY AI</Text>
      </View>
      <View style={styles.imgView}>
      <Image source={require('../assets/images/homeBG.png')} style={styles.img} />
      </View>
      <View style={styles.writeView}>
        <Text style={styles.txt}>All your healthcare needs</Text>
        <Text style={styles.txt}> in your finger tips</Text>
      </View>
      <View style={styles.sview}>
        <TouchableOpacity style={styles.sbtn}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.bottomText}>
          <Text style={styles.bottom}>Already have an account?</Text>
          <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#378b4e'
    },
    topImgView: {
      maxWidth: '100%'
    },
    topImg: {
      width: '100%',
      height: 190
    },
    headView: {
      marginTop: -10
    },
    h1: {
      fontSize: 40,
      textAlign: 'center',
      fontFamily: 'cursive',
      color: '#76C6F8',
      fontWeight: '800'
    },
    imgView:{
      marginTop: 10
    },
    img: {
      width: 250,
      height: 250,
      marginLeft: 55,
      marginBottom: 20,
      marginTop: -10
    },
    writeView: {
      marginTop: -50
    },
    txt: {
      textAlign: 'center',
      fontSize: 20,
      color: 'white',
      fontFamily: 'monospace',
    },
    sview: {
      marginBottom: 20
    },
    sbtn: {
      paddingTop: 12,
      backgroundColor: '#f6e05e',
      borderRadius: 16,
      margin: 20,
      paddingBottom: 12,
      paddingLeft: 28,
      paddingRight: 28
    },
    signup: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'gray'
    },
    bottomText: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: -5
    },
    bottom: {
      color: 'white',
      fontWeight: "semibold",
      fontSize: 18,
      fontFamily: 'monospace'
    },
    login: {
      fontWeight: "900",
      color: '#76C6F8',
      fontSize: 18
    }
  })
  
export default Home