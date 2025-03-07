// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import FileViewer from 'react-native-file-viewer';
// import RNFS from 'react-native-fs';

// const PDFViewer = ({ route, navigation }) => {
//     const { filePath } = route.params;
//     const [isMounted, setIsMounted] = useState(true);

//     useEffect(() => {
//         if (filePath && isMounted) {
//             RNFS.exists(filePath)
//                 .then((exists) => {
//                     if (exists) {
//                         FileViewer.open(filePath)
//                             .then(() => console.log('File opened successfully'))
//                             .catch((error) => {
//                                 console.error('Error opening file:', error);
//                                 if (isMounted) {
//                                     Alert.alert('Error', 'Could not open file');
//                                     navigation.goBack();
//                                 }
//                             });
//                     } else {
//                         console.error('File does not exist:', filePath);
//                         if (isMounted) {
//                             Alert.alert('Error', 'File not found');
//                             navigation.goBack();
//                         }
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error checking file existence:', error);
//                     if (isMounted) {
//                         Alert.alert('Error', 'Failed to check file');
//                         navigation.goBack();
//                     }
//                 });
//         }

//         return () => {
//             setIsMounted(false); // Cleanup on unmount
//         };
//     }, [filePath, isMounted]);

//     return (
//         <View style={styles.container}>
//             <Text>Opening document...</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//     },
// });

// export default PDFViewer;
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

type routeStr = {
    params: { filePath: any; };
    route: string;
}
const PDFViewer = ({ route }: { route: routeStr}) => {
    const { filePath } = route.params;

    return (
        <View style={styles.container}>
            <Pdf
                source={{ uri: filePath }}
                style={styles.pdf}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: '100%',
    },
});

export default PDFViewer;
// // import React from 'react';
// // import { View, StyleSheet } from 'react-native';
// // import Pdf from 'react-native-pdf';

// // const PDFViewer = ({ route }) => {
// //     const { filePath } = route.params;

// //     return (
// //         <View style={styles.container}>
// //             <Pdf
// //                 source={{ uri: filePath }}
// //                 style={styles.pdf}
// //             />
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     pdf: {
// //         flex: 1,
// //         width: '100%',
// //     },
// // });

// // export default PDFViewer;