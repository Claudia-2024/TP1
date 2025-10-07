import ListTickets from "@/components/TicketItem";
import { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const initialTickets = [
  {
    id: 1,
    title: "Create project",
    description: "Project initialised and push to Github",
    status: "Completed",
  },
  {
    id: 2,
    title: "Define Tickets",
    description: "Create tickets",
    status: "Under Assistance",
  },
  {
    id: 3,
    title: "Perform the tickets",
    description: "Carry out each ticket",
    status: "Created",
  },
];

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tickets, setTickets] = useState(initialTickets);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    status: "Created",
  });

  const addTicket = () => {
    if (newTicket.title.trim() === "") {
      alert("Please enter a title");
      return;
    }

    const ticketToAdd = {
      id: tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1,
      title: newTicket.title,
      description: newTicket.description,
      status: newTicket.status,
    };

    setTickets((prev) => [...prev, ticketToAdd]);
    setNewTicket({ title: "", description: "", status: "Created" });
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.titleText}>Ticket Tracker</Text>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView>
            <View style={styles.modalView}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Ticket Title"
                value={newTicket.title}
                onChangeText={(text) =>
                  setNewTicket((prev) => ({ ...prev, title: text }))
                }
              ></TextInput>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={newTicket.description}
                onChangeText={(text) =>
                  setNewTicket((prev) => ({ ...prev, description: text }))
                }
              ></TextInput>
              <View style={styles.editButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Add" onPress={addTicket} />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
        <View style={styles.button}>
          <Button
            title="Add New Ticket"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={tickets}
          renderItem={({ item }) => <ListTickets ticket={item} />}
          keyExtractor={(item) => item.title}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignSelf: "center",
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 30,
  },
  label: {
    flexDirection: "row",
    alignSelf: "flex-start",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  title: {
    alignSelf: "center",
  },
  titleText: {
    fontSize: 30,
    marginBottom: 20,
  },
});
