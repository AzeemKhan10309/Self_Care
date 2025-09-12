import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons

// Message type
type Message = {
  id: string;
  sender: 'doctor' | 'user';
  text: string;
  time: string;
};

const messages: Message[] = [
  {
    id: '1',
    sender: 'doctor',
    text: 'Hello, How can I help you?',
    time: '04:29 PM',
  },
  {
    id: '2',
    sender: 'user',
    text: 'I have suffering from headache and cold for past 3 days, I took 2 tablets of dolo, but still pain.',
    time: '06:30 PM',
  },
  {
    id: '3',
    sender: 'doctor',
    text: 'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    time: '04:29 PM',
  },
  {
    id: '4',
    sender: 'user',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    time: '06:30 PM',
  },
  {
    id: '5',
    sender: 'doctor',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    time: '04:29 PM',
  },
];

const InboxScreen = () => {
  // ✅ Fix: explicitly type `item` as Message
const renderMessage = ({ item }: { item: Message }) => {
  const isUser = item.sender === 'user';
  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.doctorMessage,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          isUser ? styles.userMessageText : styles.doctorMessageText,
        ]}
      >
        {item.text}
      </Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back" size={24} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.doctorName}>John Wilson</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Icon name="call-outline" size={24} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList<Message> 
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

    <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type something..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
  },
  chatContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
  },
  doctorMessage: {
    backgroundColor: '#F6F6F6',
    alignSelf: 'flex-start',
      color: '#000000ff',

  },
  userMessage: {
    backgroundColor: '#1F62E8',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  timeText: {
    fontSize: 10,
    color: '#ddd',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    backgroundColor: '#7367F0',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },


doctorMessageText: {
  color: '#000', 
},

userMessageText: {
  color: '#fff', 
},

});

export default InboxScreen;
