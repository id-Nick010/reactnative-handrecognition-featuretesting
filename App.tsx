// App.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { loadLSTMModel } from './ModelLoader';
import type { TensorflowModel } from 'react-native-fast-tflite';
import { CameraAccess } from './utils/CameraAccess';

const App: React.FC = () => {
  const [modelStatus, setModelStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<TensorflowModel | null>(null);

  // Load the LSTM TFLite model on mount
  useEffect(() => {
    async function load() {
      const { model, error } = await loadLSTMModel();
      if (error) {
        setError(error);
        setModelStatus('error');
      } else {
        setModel(model);
        setModelStatus('loaded');
      }
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <CameraAccess>
        {(device, permissionGranted) =>
          device != null && permissionGranted ? (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              // You can later add a frameProcessor for inference
            />
          ) : (
            <Text style={styles.text}>No camera available or permission denied.</Text>
          )
        }
      </CameraAccess>
      <View style={styles.overlay}>
        {modelStatus === 'loading' && <ActivityIndicator size="large" color="#fff" />}
        {modelStatus === 'loaded' && <Text style={styles.text}>✅ Model loaded successfully!</Text>}
        {modelStatus === 'error' && <Text style={styles.text}>❌ Error: {error}</Text>}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  overlay: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});