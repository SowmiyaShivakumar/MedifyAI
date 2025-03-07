import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ActivityIndicator, Pressable } from 'react-native';

// Change this to your computer's IP address when testing on a physical device
// or use localhost if using an emulator
const SERVER_URL = 'http://192.168.65.178:5000';

const DiagnoSense = () => {
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [loading, setLoading] = useState(false);

    const getDiagnosis = async () => {
        if (!symptoms.trim()) {
            Alert.alert('Error', 'Please enter valid symptoms');
            return;
        }

        setLoading(true);
        setDiagnosis('');

        try {
            const response = await fetch(`${SERVER_URL}/diagnose`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ symptoms }),
            });

            const data = await response.json();
            if (response.ok) {
                setDiagnosis(data.diagnosis);
            } else {
                setDiagnosis('Error: ' + (data.error || 'Unknown error'));
                console.error('Server error:', data.error);
            }
        } catch (error) {
            console.error('Network error:', error);
            setDiagnosis('Network error: Unable to connect to diagnosis server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
             <View style={styles.topBar}>
                            <Text style={styles.topText}>DiagnoSense</Text>
              </View>
            
            <Text style={styles.subheader}>AI-Powered Disease Predictor</Text>
            
            <Text style={styles.label}>Describe your symptoms in detail:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter symptoms (e.g., fever, headache, cough)"
                value={symptoms}
                onChangeText={setSymptoms}
                multiline={true}
                numberOfLines={4}
            />
            
            <Pressable style={styles.btn} onPress={getDiagnosis}
                     >
                         <Text style={styles.btnText}>Get Diagnosis</Text>
                     </Pressable>
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0066cc" />
                    <Text style={styles.loading}>Analyzing symptoms...</Text>
                </View>
            ) : null}
            
            {diagnosis ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultHeader}>Analysed Diseases</Text>
                    <Text style={styles.result}>{diagnosis}</Text>
                    <Text style={styles.disclaimer}>
                        ⚠️ This is a screening tool only. Always consult a healthcare professional for proper diagnosis.
                    </Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        // padding: 20, 
        backgroundColor: '#fff' 
    },
    header: { 
        fontSize: 30, 
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333'
    },
    subheader: {
        fontSize: 24,
        margin: 20,
        color: '#666',
        fontStyle: 'italic',
        fontWeight: '500',
        textAlign: 'center'
    },
    label: {
        fontSize: 20,
        margin: 15,
        color: '#333'
    },
    input: { 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5,
        padding: 12, 
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
        minHeight: 120,
        fontSize: 16,
        margin: 20
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    loading: {
        marginTop: 10,
        fontSize: 16,
        color: '#0066cc'
    },
    resultContainer: {
        margin: 20,
        padding: 15,
        backgroundColor: '#f0f8ff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#deebf7'
    },
    resultHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center'
    },
    result: { 
        fontSize: 18, 
        color: '#333',
        lineHeight: 24,
        marginBottom: 15
    },
    disclaimer: {
        fontSize: 16,
        color: '#c33',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center'
    },
    topBar: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#38b2b4',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    topText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '600'
    },
    btn: {
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
});

export default DiagnoSense;