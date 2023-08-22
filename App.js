import React from "react";
import { View, Text } from "react-native";
import Editor from "./components/Editor"; 

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>HackEditor</Text>
      </View>
      <View style={styles.editor}>
        <Editor />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    alignItems: "center",
    padding: 30,
    borderRadius: 50,
    margin: 20,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  editor: {
    flex: 1,
    margin: 20,
  },
};

export default App;