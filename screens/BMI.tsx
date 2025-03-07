import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDoc, getFirestore, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useFocusEffect } from '@react-navigation/native'

const BMI = () => {
  const [wt, setWt] = useState('')
  const [ht, setHt] = useState('')
  const [BMI, setBMI] = useState(0)
  const [desc, setDesc] = useState('')
  const [sugg, setSugg] = useState('')
  const auth = getAuth();
  const db = getFirestore();
  async function getData() {
    const user = auth.currentUser
    if (user) {
      const uid = user.uid
      const docref = doc(db, "users", uid)
      try {
        const data = await getDoc(docref)
        if (data.exists()) {
          const dat = data.data()
          setWt(dat?.weight)
          setHt(dat?.height)
          // console.log(wt)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  function calculate() {
    const htNew = Number(ht)
    const wtNew = Number(wt)
    const htM = htNew / 100
    const bmi = wtNew / (htM * htM)
    const bmiNew = Number(bmi)
    const res = parseFloat(bmiNew.toFixed(2))
    console.log(res)
    setBMI(res);
    if(res < 18.5){
      setDesc("Underweight");
      setSugg("Focus on nutrient-rich foods and consider a nutrient-rich diet to gain weight safely.");
    }
    else if(res >= 18.5 && res <= 24.9){
      setDesc("Normal weight");
      setSugg("Maintain your current lifestyle with a balanced diet and regular exercise.");
    }
    else if(res >= 25 && res <= 29.9){
      setDesc("Overweight");
      setSugg("Incorporate regular exercise and watch your calorie intake.");    
    }
    else if(res >= 30 && res <= 35){
      setDesc("Obese");
      setSugg("Adopt a calorie-controlled diet and focus on weight loss seeking medical advice.");
    }
    else{
      setDesc("Morbidly Obese");
      setSugg("Work closely with healthcare professionals on a structured weight loss plan.");
    }
  }
  function getBMIColor(){
    if(desc == "Underweight") return '#4a90e2'
    else if(desc == "Normal weight") return '#4caf50'
    else if(desc == "Overweight") return '#ffc107'
    else if(desc == "Obese") return '#ff9800'
    else return '#d32f2f'
  }
  function getBMIDescColor(){
    if(desc == "Underweight") return '#87ceeb'
    else if(desc == "Normal weight") return '#8bc34a'
    else if(desc == "Overweight") return '#ffa726'
    else if(desc == "Obese") return '#ff7043'
    else return '#e53935'
  }
  useEffect(() => {
    getData()
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      setBMI(0)
      setDesc('')
      setSugg('')
    }, [])
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#fff7f0' }}>
      {/* <Text>{wt}</Text>
       */}
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.wtText}>Weight</Text>
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 15, fontStyle: 'italic' }}>{wt} kg</Text>
        </View>
        <View style={styles.col1}>
          <Text style={styles.wtText}>Height</Text>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 15, fontStyle: 'italic' }}>{ht} cm</Text>
        </View>
      </View>
      <Pressable style={styles.btn} onPress={calculate}>
        <Text style={styles.btnText}>Calculate</Text>
      </Pressable>
      
      <View style={{ marginLeft: 270, marginTop: -90  }}>
        <Image source={require('../assets/images/bmiSidebar.png')}  style={{marginBottom: 50}}/>
      </View>
      {BMI > 0 && (
        <><View style={styles.result}>
          <Text style={{ fontSize: 30, fontWeight: "400", textAlign: 'center', color: '#00001c' }}>Your BMI is</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', color: '#ff6b6b' }}>{BMI}</Text>
        </View>
          
        <View style={styles.resultDesc}>
          <Text style={{ fontSize: 25, fontWeight: "600", fontStyle: 'normal', color: getBMIColor(), textAlign: 'center'}}>{desc}</Text>  
          <Text style={{ fontSize: 25, fontWeight: "400", fontStyle: 'italic', color: getBMIDescColor(), textAlign: 'center'}}>{sugg}</Text>  
        </View></>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 40,
    padding: 10,
    gap: 20,
    justifyContent: 'center',
    borderRadius: 40
  },
  col1: {
    backgroundColor: '#38b2b5',
    width: 120,
    height: 130,
    padding: 20,
    borderRadius: 20,
    elevation: 5
  },
  wtText: {
    textAlign: 'center',
    fontWeight: "500",
    fontSize: 25
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "400",
    color: 'white'
  },
  btn: {
    backgroundColor: '#ff6b6b',
    marginLeft: 100,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 25
  },
  result: {
    gap: 10,
    marginTop: -100,
  },
  resultDesc:{
    margin: 13,
    gap: 10
  }
})
export default BMI