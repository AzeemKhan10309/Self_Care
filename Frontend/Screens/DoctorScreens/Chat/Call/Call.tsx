
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import { LinearGradient } from 'expo-linear-gradient';

const CallScreen = () => {
  return (
    <LinearGradient colors={['#007AFF', '#0066DD']} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.callType}>Audio Call</Text>

        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }} // Replace with actual doctor image
          style={styles.profileImage}
        />

        <Text style={styles.name}>David H. Brown</Text>
        <Text style={styles.callDuration}>22:55 min</Text>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton}>
            <Icon name="volume-high" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Icon name="videocam" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Icon name="mic" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.hangupButton}>
          <Icon name="call" size={24} color="#fff" style={{ transform: [{ rotate: '135deg' }] }} />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 50,
  },
  callType: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 40,
  },
  name: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginTop: 20,
  },
  callDuration: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 40,
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 50,
  },
  hangupButton: {
    backgroundColor: '#FF4D4D',
    padding: 20,
    borderRadius: 50,
    marginBottom: 40,
  },
});

export default CallScreen;
