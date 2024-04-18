import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function App() {
  const [Count, setCount] = useState(1);
  const [Data, setData] = useState([]);
  const [User, setUser] = useState(1);

useEffect(() => {
  setUser(Count);
}, [Count])



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${User}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [User]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          {Data ? (
            <View>
              <Text>User ID: {Data.id}</Text>
              <Text>User First Name: {Data.first_name}</Text>
              <Text>User Last Name: {Data.last_name}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setCount(Count - 1);
          }}
        >
          
          <Text style={styles.buttons}>-</Text>
        </TouchableOpacity>

        <Text style={styles.count}>{Count}</Text>

        <TouchableOpacity
          onPress={() => {
            setCount(Count + 1);
          }}
        >
          <Text style={styles.buttons}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "tomato",
    width: 70,
    height: 70,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 40,
    borderRadius: 35,
    margin: 50,
  },
  count: {
    fontSize: 24,
    marginHorizontal: 10,
  },
});
