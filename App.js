import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {FlatList,StyleSheet,Text,TextInput,TouchableOpacity,View,Keyboard,} from "react-native";

export default function App() {
  const [task, setTask] = React.useState("");
  const [taskItems, setTaskItems] = useState([
    { id: 1, title: "task1", active: false },
  ]);
  const [filteredtasks, setfilteredtasks] = useState([
    { id: 1, title: "task1", active: false },
  ]);

  // add tasks to list
  const handleAddTask = () => {
    if (task.length > 3) {
      Keyboard.dismiss();
      let id = taskItems.length + 1;
      let newArray = { id: id, title: task, active: false };
      setTaskItems([...taskItems, newArray]);
      setfilteredtasks([...taskItems, newArray]);
      setTask("");
    }
  };
  // change active status
  const setToggleCheckBox = (val, index) => {
    let newArray = [...taskItems];
    newArray[index].active = !newArray[index].active;
    setTaskItems([...newArray]);
    console.log("checked");
  };
  // git actives tasks
  const activeTasks = () => {
    let data = [];
    data = taskItems
      .filter(function (item) {
        return item.active === false;
      })
      .map(function ({ id, title, active }) {
        return { id, title, active };
      });
    setfilteredtasks([...data]);
  };

  // git all tasks
  const AllTasks = () => {
    setfilteredtasks([...taskItems]);
  };
  // git done tasks
  const doneTasks = () => {
    let data = [];
    data = taskItems
      .filter(function (item) {
        return item.active === true;
      })
      .map(function ({ id, title, active }) {
        return { id, title, active };
      });
    setfilteredtasks([...data]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContent}>
        <Text style={styles.baseText}>
          <Text style={styles.pagetitle}>
            BABY SHARK
            {"\n"}
          </Text>
          <Text style={styles.pagedis}>
            <Text style={styles.innerText}>TODO</Text>
            -dododooooo
          </Text>
        </Text>
      </View>

      {/* search component */}
      <View style={styles.serchview}>
        <TextInput
          style={styles.search}
          placeholder={"write a task"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()} style={styles.addBtn}>
          <View>
            <Text
              style={{
                fontSize: 40,
                paddingHorizontal: "center",
                paddingVertical: "center",
              }}
            >
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "80%",
          paddingTop: 25,
        }}
      >
        <TouchableOpacity onPress={() => activeTasks()} style={styles.showdata}>
          <View>
            <Text style={styles.btntab}>Active</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => AllTasks()} style={styles.showdata}>
          <View>
            {" "}
            <Text style={{ fontSize: 18, fontWeight: "500" }}>All</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => doneTasks()} style={styles.showdata}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* all list show */}

      <View style={styles.items}>
        <FlatList
          data={filteredtasks}
          ListEmptyComponent={
            <Text
              style={{ color: "white", fontSize: 50,paddingVertical:'center' }}
            >
              no data hear
            </Text>
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <View style={styles.leftItem}>
                <FontAwesome
                  name="square-o"
                  size={24}
                  style={{
                    borderRadius: 5,
                    marginRight: 10,
                    color: item.active ? "#cc2900" : "white",
                  }}
                  value={item.active}
                  onPress={(value) => setToggleCheckBox(value, index)}
                />
                <Text style={{
                        maxWidth: "100%",
                        fontSize: 20,
                        color: item.active ? "#cc2900" : "white",
                        textDecorationLine: item.active ? "line-through" : "none",
                        textDecorationColor: "#cc2900",
                        }}>{item.title}
               </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#28004d",
    paddingTop: 130,
  },
  pagetitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    color: "#cc2900",
  },
  pagedis: {
    fontSize: 17,
    color: "#fff",
    marginHorizontal: 50,
  },
  innerText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  addBtn: {
    borderWidth: 1,
    borderColor: "#cc2900",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    backgroundColor: "#cc2900",
    borderRadius: 50,
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center",
  },
  showdata: {
    borderWidth: 1,
    borderColor: "#cc2900",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.25,
    height: 50,
    backgroundColor: "#cc2900",
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  search: {
    borderColor: "white",
    borderWidth: 1,
    width: "70%",
    borderRadius: 60,
    backgroundColor: "white",
    fontSize: 17,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  btn: {
    borderRadius: 60,
    alignContent: "flex-start",
  },
  serchview: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  items: {
    paddingHorizontal: 50,
    marginTop: 30,
  },
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  leftItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  btntab: { fontSize: 18, fontWeight: "500" },
  btnActive: {
    color: "white",
  }
});
