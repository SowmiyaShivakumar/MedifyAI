import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import { getAuth } from 'firebase/auth';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AwesomeAlert from 'react-native-awesome-alerts';

const API_BASE_URL = 'https://192.168.65.178:3000';
type RootStackParamList = {
    PDFViewer: { filePath: string };
};


const RecordKeeper = () => {
    
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(false)
    const [alertConfig, setAlertConfig] = useState({
        title: '',
        message: '',
        confirmText: "OK",
        onConfirmPressed: () => setAlert(false)
    });
    useEffect(() => {
        // requestStoragePermission();
        fetchDocuments();
    }, []);

    const getCurrentUser = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
            throw new Error('User not authenticated');
        }
        
        return user;
    };
    const showAwesomeAlert = (title: string, message: string, confirmText = 'OK', onConfirmPressed = () => setAlert(false)) => {
        setAlertConfig({ title, message, confirmText, onConfirmPressed });
        setAlert(true);
    };
    const fetchDocuments = async () => {
        setLoading(true);
        setError("");
        
        try {
            const user = getCurrentUser();
            console.log('Fetching documents for user:', user.uid);
            
            const response = await fetch(`${API_BASE_URL}/RecordKeeperService/backend/documents/${user.uid}`);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Received data:', data);
            
            if (data.success) {
                console.log('Documents received:', data.documents);
                setDocuments(data.documents);
            } else {
                throw new Error(data.message || 'Failed to fetch documents');
            }
        } catch (error:any) {
            console.error('Error fetching documents:', error);
            setError(error.message || "Failed to load documents");
            showAwesomeAlert('Error', error.message || "Failed to load documents");
        } finally {
            setLoading(false);
        }
    };

      
    const openDocument = async (document:any) => {
        try {
            setLoading(true);
            const user = getCurrentUser();
            
            const localDir = Platform.select({
                ios: `${RNFS.DocumentDirectoryPath}/`,
                android: `${RNFS.ExternalDirectoryPath}/`
            });
            
            await RNFS.mkdir(localDir as string);
            const localFile = `${localDir}${document.name}`;
            
            // Download file
            await RNFS.downloadFile({
                fromUrl: `${API_BASE_URL}/RecordKeeperService/backend/documents/${user.uid}/${encodeURIComponent(document.name)}`,
                toFile: localFile
            }).promise;

            if(document.name.toLowerCase().endsWith('.pdf')){
                nav.navigate("PDFViewer", { 
                filePath: localFile
            });
        }
        else{
            await FileViewer.open(localFile);
        }
        } catch (error) {
            console.error('Error:', error);
            showAwesomeAlert('Error', 'Failed to open file');
        } finally {
            setLoading(false);
        }
    };
    const hideError = () => {
        setLoading(false);
        // nav.navigate("RecordKeeper")
    }
    const pickDoc = async () => {
        setError("");
        
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                copyTo: 'cachesDirectory',
            });
            
            const user = getCurrentUser();
            const formData = new FormData();
            formData.append('userId', user.uid);
            
            // const filePath = res[0].fileCopyUri || res[0].uri;
            const filePath = res[0]?.fileCopyUri ?? res[0]?.uri ?? '';

            const file = {
                uri: filePath,
                type: res[0].type,
                name: res[0].name
            };
            formData.append('file', file);

            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                showAwesomeAlert('Success', 'File uploaded successfully');
                fetchDocuments();
            } else {
                throw new Error(result.message || 'Upload failed');
            }
        } catch (error:any) {
            console.error('Upload error:', error);
            if (DocumentPicker.isCancel(error)) {
                return;
            }
            showAwesomeAlert('Error', error.message || 'Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (filename: string | number | boolean) => {
        try {
            const user = getCurrentUser();
            
            showAwesomeAlert(
                'Confirm Delete',
                `Are you sure you want to delete "${filename}"?`,
                'Delete',
                async () => {
                    setLoading(true);
                    const response = await fetch(
                        `${API_BASE_URL}/delete/${user.uid}/${encodeURIComponent(filename)}`,
                        { method: 'DELETE' }
                    );
                  if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }

                            const result = await response.json();

                            if (result.success) {
                                showAwesomeAlert('Success', 'File deleted successfully');
                                fetchDocuments();
                            } else {
                                throw new Error(result.message || 'Delete failed');
                            }
                        }
                    )
                }  
         catch (error:any) {
            console.error('Delete error:', error);
            showAwesomeAlert('Error', error.message || 'Failed to delete file');
        } finally {
            setLoading(false);
        }
    };

    const getFileIcon = (fileName : string) => {
        const ext = fileName.split('.').pop()?.toLowerCase() || "";
        const icons = {
            'pdf': 'file-pdf',
            'doc': 'file-word',
            'docx': 'file-word',
            'jpg': 'file-image',
            'jpeg': 'file-image',
            'png': 'file-image',
            'txt': 'file-alt',
            'csv': 'file-csv'
        } as const;
        return icons[ext as keyof typeof icons] ?? 'file';
    };
    type DItem = {
        name: string
    }
    const renderDocument = ({ item }:{ item: DItem}) => (
        <TouchableOpacity 
            style={styles.documentItem}
            onPress={() => openDocument(item)}
        >
            <View style={styles.documentInfo}>
                <Icon 
                    name={getFileIcon(item.name)} 
                    size={20} 
                    color="#38b2b4" 
                    style={styles.fileIcon}
                />
                <Text style={styles.documentName} numberOfLines={1} ellipsizeMode="middle">
                    {item.name}
                </Text>
            </View>
            <TouchableOpacity 
                onPress={() => deleteDocument(item.name)}
                style={styles.deleteButton}
                disabled={loading}
            >
                <Icon name="trash" size={20} color="#ff4444" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topText}>Record Keeper</Text>
                <TouchableOpacity onPress={pickDoc} disabled={loading}>
                    {/* <Text>upload</Text> */}
                    <Icon name='file-upload' size={25} style={styles.topIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : documents.length > 0 ? (
                    <>
                        {/* <Text style={styles.welcomeText}>Your Documents</Text> */}
                        <FlatList
                            data={documents}
                            renderItem={renderDocument}
                            keyExtractor={item => item.name}
                            contentContainerStyle={styles.listContainer}
                        />
                    </>
                ) : (
                    <Text style={styles.text}>Upload your health records here!</Text>
                )}
            </View>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title={alertConfig.title}
                message={alertConfig.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText={alertConfig.confirmText}
                confirmButtonColor="#7C3AED"
                onConfirmPressed={alertConfig.onConfirmPressed}
                alertContainerStyle={styles.alertContainer}
                titleStyle={styles.alertTitle}
                messageStyle={styles.alertMessage}
                confirmButtonTextStyle={styles.confirmBtn}
            />
     
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBar: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#38b2b5',
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
    topIcon: {
        color: '#fff7f0'
    },
    body: {
        flex: 1,
        margin: 20
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 250,
        fontStyle: 'italic',
        fontFamily: 'monospace',
        padding: 5,
        color: '#38b2b5'
    },
    errorText: {
        color: '#ff4444',
        textAlign: 'center',
        marginTop: 20
    },
    listContainer: {
        paddingVertical: 10
    },
    documentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2
    },
    documentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    documentName: {
        fontSize: 16,
        color: '#38b2b5',
        flex: 1,
        marginRight: 10
    },
    deleteButton: {
        padding: 5
    },
    fileIcon: {
        marginRight: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#38b2b5',
        marginBottom: 15,
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
        color: '#ff6b6b',
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
});

export default RecordKeeper;