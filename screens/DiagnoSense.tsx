import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ActivityIndicator, Pressable, SafeAreaView, StatusBar } from 'react-native';

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
        <SafeAreaView style={styles.safeArea}>
            {/* <StatusBar backgroundColor="" barStyle="light-content" /> */}
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.topText}>DiagnoSense</Text>
                </View>
                
                <Text style={styles.subheader}>AI-Powered Disease Predictor</Text>
                
                <View style={styles.contentContainer}>
                    <Text style={styles.label}>Describe your symptoms in detail:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter symptoms (e.g., fever, headache, cough)"
                        placeholderTextColor="#38b2b5"
                        value={symptoms}
                        onChangeText={setSymptoms}
                        multiline={true}
                        numberOfLines={4}
                    />
                    
                    <Pressable 
                        style={({pressed}) => [
                            styles.btn,
                            pressed && styles.btnPressed
                        ]}
                        onPress={getDiagnosis}
                    >
                        <Text style={styles.btnText}>Get Diagnosis</Text>
                    </Pressable>
                    
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#6D28D9" />
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
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: '#4A1D96',
    },
    container: { 
        flex: 1, 
        backgroundColor: '#F5F3FF',
    },
    contentContainer: {
        padding: 20,
    },
    header: { 
        fontSize: 30, 
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#38b2b5'
    },
    subheader: {
        fontSize: 20,
        marginVertical: 15,
        color: '#38b2b5',
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#7fd3d4',
        fontWeight: '500',
    },
    input: { 
        borderColor: '#38b2b5', 
        borderWidth: 1.5, 
        borderRadius: 12,
        padding: 15, 
        marginBottom: 25,
        backgroundColor: '#0000',
        textAlignVertical: 'top',
        minHeight: 120,
        fontSize: 16,
        color: 'black',
    },
    loadingContainer: {
        marginTop: 25,
        alignItems: 'center'
    },
    loading: {
        marginTop: 10,
        fontSize: 16,
        color: '#6D28D9',
        fontWeight: '500',
    },
    resultContainer: {
        marginTop: 25,
        padding: 20,
        backgroundColor: '#EDE9FE',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#7fd3d4',
        elevation: 3,
        shadowColor: '#6D28D9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    resultHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#38b2b5',
        textAlign: 'center'
    },
    result: { 
        fontSize: 17, 
        color: 'black',
        lineHeight: 26,
        marginBottom: 15,
        fontWeight: '400',
    },
    disclaimer: {
        fontSize: 15,
        color: '#BE185D',
        fontStyle: 'italic',
        marginTop: 15,
        textAlign: 'center',
        fontWeight: '500',
    },
    topBar: {
        padding: 18,
        backgroundColor: '#38b2b5',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.5
    },
    topText: {
        fontSize: 28,
        color: 'white',
        fontWeight: '700',
        letterSpacing: 1,
    },
    btn: {
        alignSelf: 'center',
        width: '70%',
        padding: 15,
        borderRadius: 30,
        backgroundColor: '#38b2b5',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#4C1D95',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    btnPressed: {
        backgroundColor: '#38b2b5',
        elevation: 2,
        transform: [{ scale: 0.98 }]
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
});

export default DiagnoSense;