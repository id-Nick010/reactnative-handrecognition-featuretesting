// CameraAccess.tsx
import React, {useEffect, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

export interface CameraAccessProps {
  children: (
    device: ReturnType<typeof useCameraDevice>,
    permissionGranted: boolean,
  ) => React.ReactNode;
}

export const CameraAccess: React.FC<CameraAccessProps> = ({children}) => {
  // Get the back camera device

  const device = useCameraDevice('front');


  // useCameraPermission returns a PermissionState (typically "authorized", "denied", etc.)
  const {hasPermission, requestPermission} = useCameraPermission();
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    if (device === undefined) {
      console.log('Camera device is still loading...');
    } else {
      console.log('Camera device available:', device);
    }
  }, [device]);

  useEffect(() => {
    (async () => {
      const status = await requestPermission();
      console.log('Camera permission grandted:', status);
      setPermissionGranted(status);
    })();
  }, [requestPermission]);

  useEffect(() => {
    // Update when hasPermission changes
    console.log('Updated camera permission state:', hasPermission);
    setPermissionGranted(hasPermission);
  }, [hasPermission]);

  return <>{children(device, permissionGranted)}</>;
};
