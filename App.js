//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Nothing Scanned! :(')

  // Ask user for camera permission
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Scanned bar code 
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

   // Check permission & show view
   if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Asking for permission to use the camera.</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Camera cannot be accessed.</Text>
        <Button title={'Allow Your Camera!'} onPress={() => askForCameraPermission()} />
      </View>)
  }

   // View
   return (
    <View style={styles.container}>
      <Text style={styles.baseText}>QR - BARCODE SCANNER!</Text>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'SCAN THIS!'} onPress={() => setScanned(false)} color='lightblue' />}
    </View>
  );
}

//Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  maintext: {
    fontSize: 22,
    margin: 30,
  },

  baseText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "darkblue",
  },

  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 350,
    overflow: 'hidden',
    borderRadius: 50,
    backgroundColor: 'lightblue'
  },
});