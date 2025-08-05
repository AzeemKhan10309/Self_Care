// File: src/screens/CollectInfoScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';

const CollectInfoScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', { name, age, email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell me more about yourself</Text>
      <Input
        value={name}
        placeholder="Enter your name"
        onChangeText={setName}
        label="Name"
      />
      <Input
        value={age}
        placeholder="Enter your age"
        onChangeText={setAge}
        label="Age"
      />
      <Input
        value={email}
        placeholder="Enter your email"
        onChangeText={setEmail}
        label="Email"
      />
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CollectInfoScreen;
