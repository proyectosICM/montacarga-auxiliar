import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function sendPushNotification() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Se a detectado ingreso de camion a carril 📬`,
        body: 'Carril numero 3 pendiente a asignacion',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 12 },
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }
}

export async function sendPushNotificationCamionPendiente(numCarril) {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Se a detectado ingreso de camion a carril 📬 ${numCarril}`,
          body: 'Carril numero 3 pendiente a asignacion',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 12 },
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  export async function sendPushNotificationCamionPendiente2(numCarril) {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Se a detectado ingreso de camion a carril 📬`,
          body: 'Carril numero 5 pendiente a asignacion',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 12 },
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }
