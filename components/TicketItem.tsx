import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListTickets({ ticket }) {
  const [modalVisisble, setModalVisisble] = useState(false);
  const getStatusStyle = () => {
    switch (ticket.status) {
      case "Completed":
        return styles.completed;
      case "Under Assistance":
        return styles.underAss;
      case "Created":
        return styles.created;
      default:
        return styles.created;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return "#0000FF";
      case "Under Assistance":
        return "#baba4fff";
      case "Completed":
        return "#008000";
      default:
        return "#0000FF";
    }
  };
  return (
    <View style={styles.seperator}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisisble}
        onRequestClose={() => {
          setModalVisisble(!modalVisisble);
        }}
      >
        <SafeAreaView>
          <View style={styles.modalView}>
            <Text>Let's edit the task</Text>
            <Text>{ticket.title}</Text>
            <Text>{ticket.description}</Text>
          </View>
        </SafeAreaView>
      </Modal>
      <Pressable onPress={() => setModalVisisble(true)}>
        <View style={styles.display}>
          <Text>{ticket.title}</Text>
          <Text style={{ color: getStatusColor(ticket.status) }}>
            {ticket.status}
          </Text>
          <Ionicons name="create-outline" size={20} />
          <Ionicons name="trash-outline" size={20} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  completed: {
    color: "#008000",
  },
  created: {
    color: "#0000FF",
  },
  display: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
  seperator: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  underAss: {
    color: "#FFFF00",
  },
});
