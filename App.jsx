import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatTitle, setChatTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  const sendMessage = () => {
    const message = {
      text: newMessage,
      isUser: true,
      profilePicture: './assets/profile.png',
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleOptionSelect = (option) => {
    console.log(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Trip 1</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.groupHeader}>
        <Image
          source={require('./assets/Profile.png')}
          style={styles.profilePicture}
        />
        <View style={styles.locationContainer}>
          <Text style={styles.fromText}>From: IGI Airport, T3</Text>
          <Text style={styles.toText}>To: Sector 28</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="ellipsis-vertical-outline" size={20} color="#000" style={styles.ellipsisIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messageList}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            {!msg.isUser && (
              <Image
                source={{ uri: msg.profilePicture }}
                style={styles.profilePicture}
              />
            )}
            <View style={[styles.messageItem, msg.isUser ? styles.userBubble : styles.otherBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
                <TouchableOpacity onPress={() => setBubbleVisible(!bubbleVisible)}>
          <Ionicons name="attach-outline" size={20} color="#000" style={styles.attachIcon} />
        </TouchableOpacity>

        
        {bubbleVisible && (
          <View style={styles.bubble}>
            <TouchableOpacity style={styles.bubbleIcon}>
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bubbleIcon}>
              <Ionicons name="videocam-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bubbleIcon}>
              <Ionicons name="document-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          )}
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="paper-plane-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleOptionSelect('Members')} style={styles.option}>
              <Ionicons name="people-outline" size={20} color="#000" />
              <Text style={styles.optionText}>Members</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('Share Number')} style={styles.option}>
              <Ionicons name="call-outline" size={20} color="#000" />
              <Text style={styles.optionText}>Share Number</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOptionSelect('Report')} style={styles.option}>
              <Ionicons name="alert-circle-outline" size={20} color="#000" />
              <Text style={styles.optionText}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const App = () => {
  return (
    <ChatScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E0',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageItem: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#66BB6A',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  otherBubble: {
    backgroundColor: '#E5E5E0',
    alignSelf: 'flex-start',
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 15,
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  editButton: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  locationContainer: {
    flex: 1,
  },
  fromText: {
    fontWeight: 'bold',
  },
  toText: {
    fontWeight: 'bold',
  },
  ellipsisIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'blue',
  },
  attachIcon: {
    marginRight: 10,
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#66BB6A',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    bottom: 50,
    left: 10,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bubbleIcon: {
    marginHorizontal: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageItem: {
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#66BB6A',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderColor: '#E5E5E0',
    borderWidth: 1,
  },
  messageText: {
    color: '#000',
  },
});

export default App;
