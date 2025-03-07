import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import  LinearGradient  from 'react-native-linear-gradient'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { app } from '../config'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import BIcon from 'react-native-vector-icons/MaterialIcons'

const Profile = ({ navigation }) => {
  const[uname, setUname] = useState('')
  const[age, setAge] = useState('')
  const[mail, setEmail] = useState('')
  const[weight, setWeight] = useState('')
  const[height, setHeight] = useState('')
  const[blood, setBloodType] = useState('')
    const db = getFirestore(app);
    const auth = getAuth();
  useEffect(() => {
          const getUser = async () => {
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
                      setAge(dataNew?.age);
                      setEmail(dataNew?.email);
                      setWeight(dataNew?.weight + " kg");
                      setHeight(dataNew?.height + " cm");
                      setBloodType(dataNew?.bloodType + " +ve");
                  }
                 
              }catch(e){
                  console.log(e);
              }
          }
          }
          getUser();
      }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#38b2b5', '#38b2b5']}
          start={{ x: 0, y:0 }}
          end={{ x:1, y:1 }}
          style={styles.gradient}
        >
          <Text style={{ fontSize: 35, color: 'white' }}>{uname}</Text>
        </LinearGradient>
      </View>
      <View style={{ flex: 1, marginTop: 20}}>
      <View style={styles.nameBox}>
        <Icon name='user' size={20} color={'#000'} style={styles.nameIcon}/>
        <Text style={styles.nameText}>{uname}</Text>
        {/* <EditIcon name='edit' size={20} color={'#000'} style={styles.editIcon}/> */}
      </View>

      <View style={styles.ageBox}>
        <Icon name='calendar-day' size={20} color={'#000'} style={styles.nameIcon}/>
        <Text style={styles.nameText}>{age}</Text>
      </View>

      <View style={styles.ageBox}>
        <Icons name='email' size={20} color={'#000'} style={styles.nameIcon}/>
        <Text style={styles.nameText}>{mail}</Text>
      </View>

      <View style={styles.ageBox}>
        <Icon name='weight' size={20} color={'#000'} style={styles.nameIcon}/>
        <Text style={styles.nameText}>{weight}</Text>
      </View>

      <View style={styles.ageBox}>
        <Icons name='human-male-height' size={20} color={'#000'} style={styles.nameIcon}/>
        <Text style={styles.nameText}>{height}</Text>
      </View>

      <View style={styles.ageBox}>
        <BIcon name='bloodtype' size={20} color={'#000'} style={styles.nameIcon}/>
        <Text style={styles.nameText}>{blood}</Text>
      </View>
      </View>
      {/* <View> */}
      <LinearGradient
        colors={['#38b2b5','#3182ce']}
        start={{ x: 0, y:0 }}
        end={{ x:1, y:0.5 }}  
        style={styles.gradient1}
      >
      <Pressable style={styles.btn} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.btnText}>Edit Profile</Text>
          </Pressable>
      </LinearGradient>
       
      {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    // gap: 10
  },
  header:{
    height: 200,
  },
  gradient:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150
  },
  nameBox:{
    backgroundColor: 'rgba(217, 215, 205, 0.5)',
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
    marginVertical: 12
  },
  nameIcon:{
    margin: 10
  },
  nameText:{
    margin: 10
  },
  ageBox:{
    backgroundColor: 'rgba(217,215,205,0.5)',
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
    marginVertical: 10
    // gap: -10
  },
  gradient1:{
    justifyContent: 'center',
    alignItems: 'center',
    margin: 40,
    padding: 10,
    borderRadius: 20,
    width: 200,
    left: 40,
    top: 10
  },
  btn:{
    alignItems: 'center',
    width: 100
  },
  btnText:{
    textAlign: 'center',
    color: 'white'
  }
  // editIcon:{
  //   marginLeft: 120
  // }
})
export default Profile