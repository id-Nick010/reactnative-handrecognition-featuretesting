import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';

export async function loadLSTMModel(): Promise<{ model: TensorflowModel | null; error: string | null }> {
  try {
    const model = await loadTensorflowModel(require('./assets/new_modeltest.tflite'));
    console.log('Model loaded successfully:', model);
    return { model, error: null };
  } catch (error) {
    console.error('Error loading model:', error);
    return { model: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
