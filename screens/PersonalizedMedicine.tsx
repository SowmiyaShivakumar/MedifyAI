// DiagnoSense.js - React Native component
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';

const BACKEND_URL = 'http://192.168.65.178:3255'; // Use 10.0.2.2 for Android emulator to reach localhost

const PersonalizedMedicine = () => {
  const [symptoms, setSymptoms] = useState('');
  interface Diagnosis {
    diagnosis: string;
    warning: string;
  }

  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getDiagnosis = async () => {
    if (!symptoms.trim()) {
      Alert.alert('Error', 'Please enter your symptoms');
      return;
    }

    setLoading(true);
    setError("");
    setDiagnosis(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/diagnose`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();

      if (response.ok) {
        setDiagnosis(data);
      } else {
        setError(data.error || 'An error occurred while getting diagnosis');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderDiagnosis = () => {
    if (!diagnosis) return null;

    return (
      <View style={styles.diagnosisContainer}>
        <Text style={styles.diagnosisTitle}>Preliminary Diagnostic Analysis</Text>
        <Text style={styles.diagnosisText}>{diagnosis.diagnosis}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Personalized Medicine</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Please describe your symptoms or diseases in detail:</Text>
        <TextInput
          style={styles.input}
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="Enter here..."
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={getDiagnosis}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Analyzing...' : 'Get Diagnosis'}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066cc" />
          <Text style={styles.loadingText}>Suggesting medicines...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {renderDiagnosis()}

      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerTitle}>IMPORTANT DISCLAIMER:</Text>
        <Text style={styles.disclaimerText}>
          1. This is a screening tool only, not a definitive diagnosis.
        </Text>
        <Text style={styles.disclaimerText}>
          2. All medication suggestions are for informational purposes only.
        </Text>
        <Text style={styles.disclaimerText}>
          3. Always consult a healthcare professional before taking any medication.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#38b2b4',
    padding: 15,
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: 'white',
    margin: 17,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor:'orange',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    backgroundColor: '#ffeeee',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
  },
  diagnosisContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#38b2b4',
  },
  diagnosisText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
 
  disclaimerContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeeba',
    marginBottom: 30,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#856404',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 4,
  }
});

export default PersonalizedMedicine;