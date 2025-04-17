import React from 'react';
import { Redirect, Stack } from 'expo-router';
import PathScreen from './screens/PathScreen';

export default function PathRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PathScreen />
    </>
  );
} 