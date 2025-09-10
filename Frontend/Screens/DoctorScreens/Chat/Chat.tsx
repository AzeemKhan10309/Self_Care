import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const chatData = [
  {
    id: '1',
    name: 'Ronald Richards',
    message: "So, what's your plan this weekend?",
    time: '15:41',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '2',
    name: 'Jane Cooper',
    message: 'I hope it goes well.',
    time: '16:41',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '3',
    name: 'Annette Black',
    message: "What's the progress on that task?",
    time: '08:39',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '4',
    name: 'Robert Fox',
    message: 'IDK what else is there to do',
    time: 'Yesterday',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '5',
    name: 'Wade Warren',
    message: 'Go to hell',
    time: 'Friday',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '6',
    name: 'Cody Fisher',
    message: "No, I can't come tomorrow.",
    time: 'Thursday',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '7',
    name: 'Darlene Robertson',
    message: "Yeah! You're right.",
    time: 'Tuesday',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '8',
    name: 'Marvin McKinney',
    message: 'I went there yesterday',
    time: '8/2/19',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '9',
    name: 'Ralph Edwards',
    message: "What's the progress on that task?",
    time: '7/11/19',
    avatar: require('../../../assets/Doctor.png'),
  },
  {
    id: '10',
    name: 'Savannah Nguyen',
    message: "Yeah! You're right.",
    time: '6/21/19',
    avatar: require('../../../assets/Doctor.png'),
  },
];

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.chatTextContainer}>
              <View style={styles.chatTopRow}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  chatTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chatTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatTime: {
    color: '#888',
    fontSize: 12,
  },
  chatMessage: {
    color: '#555',
    marginTop: 2,
  },
});

export default ChatScreen;
