import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import { app } from '../config'
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// import Carousel from 'react-native-reanimated-carousel';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

const Main =  ({ navigation }) => {
    const[uname, setUname] = useState('')
    const db = getFirestore(app);
    const auth = getAuth();
    // const width = Dimensions.get('window').width
    // const list = [
    //     {
    //         id: 1,
    //         image: require('../assets/images/c1.png')
    //     },
    //     {
    //         id: 2,
    //         image: require('../assets/images/c2.png')
    //     },
    //     {
    //         id: 3,
    //         image: require('../assets/images/c3.jpg')
    //     }
    // ]
    useEffect(() => {
        const getUname = async () => {
            const user = auth.currentUser;
            if(user){
            const uid = user.uid;
            const docref = doc(db, 'users', uid);
            try{
                const dat = await getDoc(docref);
                if(dat.exists()){
                    const dataNew = dat.data();
                    console.log(dataNew);
                    setUname(dataNew?.username);
                }
               
            }catch(e){
                console.log(e);
            }
        }
        }
        getUname();
    }, [])
  return (
    <View style={{flex: 1}}>
            <View style={styles.part1}>
                <View style={styles.topView}>
                    <Text style={styles.topViewText}>Hello,</Text>
                    <Text style={styles.topViewTextName}>{uname}</Text>
                </View>
                <View>
                    <Icons name='logout' size={27} style={styles.uicon} onPress={() => navigation.navigate('HomePg')}/>
                </View>
            </View>
            {/* ---- */}

            <View>
                <Text style={styles.text1}>Our Services</Text>
                <View style={styles.topRow}>
                    {/* <View style={styles.topCol1}>
                        <Pressable onPress={() => navigation.navigate('DiagnoSense')}>
                    <Image source={require('../assets/images/disease_predictor12.jpg')} style={styles.img1} width={50} height={50}/>
                    <Text style={styles.text2}>Diagno Sense</Text>
                    </Pressable>
                    </View> */}
                    <View style={styles.topCol2}>
                    <Pressable onPress={() => navigation.navigate('RecordKeeper')}>
                    <Image source={require('../assets/images/recordKeeper1.png')} style={styles.img2} width={50} height={50}/>
                    <Text style={styles.text2}>Record Keeper</Text>
                    </Pressable>
                    </View>
                </View>
                <View style={styles.topRow2}>
                    {/* <View style={styles.topCol1}>
                    <Pressable onPress={() => navigation.navigate('PersonalizedMedicine')}>
                    <Image source={require('../assets/images/personalizedMedi.jpg')} style={styles.img1} width={50} height={50}/>
                    <Text style={styles.text2}>Personalized </Text><Text style={styles.text2}>Medicine</Text>
                    </Pressable>
                    </View> */}
                    <View style={styles.topCol2}>
                    <Pressable onPress={() => navigation.navigate('FirstAidSupport')}>
                    <Image source={require('../assets/images/firstAid1.jpg')} style={styles.img3} width={50} height={50}/>
                    <Text style={styles.text2}>AI - Powered </Text><Text style={styles.text2}>Assistant</Text>
                    </Pressable>
                    </View>
                </View>
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    part1:{
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#38b2b5',
        height: 175,
        borderEndEndRadius: 45,
        borderStartEndRadius: 45,
        width: 360,
    },
    topView:{
        // flexDirection: 'row'
    },
    topViewText:{
        color: 'white',
        fontWeight: "500",
        marginLeft: 20,
        fontSize: 35,
        marginTop: 20,
        // fontFamily: 'cursive'
    },
    topViewTextName:{
        color: 'white',
        fontWeight: '500',
        fontSize: 25,
        marginLeft: 20,
        marginTop: 10,
        // fontStyle: 'italic'
    },
    uicon:{
        position: 'absolute',
        margin: 30,
        top: -5,
        left: 140,
        color: 'white'
    },
    text1:{
        fontSize: 25,
        fontWeight: "600",
        color: '#38b2b5',
        margin: 20,
        textAlign: 'center',
    },
    topRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20
    },
    topCol1:{
        padding: 12,
        backgroundColor: 'rgba(56, 178, 181, 0.2)', // #38b2b5 with 50% opacity
        borderRadius: 20,
        alignItems: 'center'
    },
    topCol2:{
        padding: 12,    
        backgroundColor: 'rgba(56, 178, 181, 0.2)', // #38b2b5 with 50% opacity
        borderRadius: 20,
        alignItems: 'center'
    },
    img1:{
        width: 120,
        height: 100,
        borderRadius: 15
    },
    img2:{
        width: 120,
        height: 100,
        borderRadius: 15,
        marginLeft: 4
    },
    img3:{
        width: 120,
        height: 100,
        borderRadius: 15,
        // marginLeft: 2
    },
    text2:{
        color: '#000000',
        fontWeight: "600",
        fontFamily: 'poppins',
        fontSize: 20
    },
    topRow2:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20
    },
})
export default Main