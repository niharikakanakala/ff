import React, { useState, useRef } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const Editor = () => {
  const [text, settext] = useState("");
  const [bold, setbold] = useState(false);
  const [italian, setitalian] = useState(false);
  const [underline, setunderline] = useState(false);
  const [font, setfont] = useState(16);
  const [align, setalign] = useState("left");
  const [quotes, setquotes] = useState(false);
  const [currCase, setcurrCase] = useState("capitalize");
  const [Analysis, setAnalysis] = useState({});
  const tarea = useRef();

  const Bold = () => {
    setbold(!bold);
  };

  const Italian = () => {
    setitalian(!italian);
  };

  const Underline = () => {
    setunderline(!underline);
  };

  const changeFont = (operation) => {
    if (operation === 1) {
      setfont(font + 1);
    } else if (font > 16) {
      setfont(font - 1);
    }
  };

  const changeAlign = (alignment) => {
    setalign(alignment);
  };

  const Quotes = () => {
    if (text.length > 0) {
      if (!quotes) {
        settext(`"${text}"`);
        setquotes(true);
      } else {
        settext(text.substring(1, text.length - 2));
        setquotes(false);
      }
    }
  };

  const caseChange = (c) => {
    if (c === "u") setcurrCase("uppercase");
    else if (c === "l") setcurrCase("lowercase");
    else setcurrCase("capitalize");
  };

  const reset = () => {
    setalign("left");
    setbold(false);
    setcurrCase("capitalize");
    setitalian(false);
    setquotes(false);
    setunderline(false);
    setfont(16);
    settext("");
  };

  const Analyse = () => {
    let check = text;
    let no_of_words = 0,
      no_of_letters = 0,
      no_of_spaces = 0,
      no_of_specialsymbols = 0,
      no_of_integers = 0;
    for (let i = 0; i < check.length; i++) {
      if (check[i] === " ") no_of_spaces++;
      else if (check[i] >= "A" && check[i] <= "Z") {
        no_of_letters++;
      } else if (check[i] >= "a" && check[i] <= "z") {
        no_of_letters++;
      } else if (check[i] >= "0" && check[i] <= "9") no_of_integers++;
      else no_of_specialsymbols++;
    }

    for (let i = 0; i < check.length; i++) {
      if (check[i] !== " ") {
        while (i < check.length && check[i] !== " ") i++;
        no_of_words++;
      }
    }

    setAnalysis({
      no_of_letters,
      no_of_words,
      no_of_integers,
      no_of_spaces,
      no_of_specialsymbols,
      bold,
      italian,
      underline,
      quotes,
      currCase,
      align,
      font,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.editorcomp}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Text Editor</Text>
        </View>

        <View style={styles.buttonContainer}>

            <View style={styles.buttonRow}>

                 <TouchableOpacity style={styles.customButton} onPress={Bold} testID="bold-icon">
                     <MaterialCommunityIcons name="format-bold" size={24} color="black" />
                 </TouchableOpacity>

                <TouchableOpacity style={styles.customButton} onPress={Italian} testID="italic-icon">
                     <MaterialCommunityIcons name="format-italic" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.customButton} onPress={Underline} testID="underline-icon">
                    <MaterialCommunityIcons name="format-underline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => changeFont(1)}>
                    <Text style={styles.buttonText}>A+</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => changeFont(0)}>
                     <Text style={styles.buttonText}>A-</Text>
                </TouchableOpacity>
            </View>
         
            <View style={styles.buttonRow}>

                <TouchableOpacity style={styles.customButton} onPress={() => changeAlign("left")} testID="left-icon">
                    <MaterialCommunityIcons name="format-align-left" size={24} color="black" />
                </TouchableOpacity>
          
                <TouchableOpacity style={styles.customButton} onPress={() => changeAlign("center")} testID="center-icon">
                    <MaterialCommunityIcons name="format-align-center" size={24} color="black"  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.customButton} onPress={() => changeAlign("right")}  testID="right-icon">
                    <MaterialCommunityIcons name="format-align-right" size={24} color="black"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textButton} onPress={Quotes}>
                     <Text style={styles.buttonText}>{"\" \""}</Text>
                </TouchableOpacity>
         
                <TouchableOpacity style={styles.textButton} onPress={() => caseChange("u")} testID="UC">
                    <Text style={styles.buttonText}>UC</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}> 

                <TouchableOpacity style={styles.textButton} onPress={() => caseChange("l")}>
                    <Text style={styles.buttonText}>LC</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.textButton} onPress={() => caseChange("c")}>
                    <Text style={styles.buttonText}>C</Text>
                  </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={reset}>
                     <MaterialCommunityIcons name="backspace-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.textButton} onPress={Analyse}>
                    <Text style={styles.buttonText}>Analyse</Text>
                </TouchableOpacity>
          
            </View>
        </View>

        <TextInput
          ref={tarea}
          style={[
            styles.textarea,
            {
              fontWeight: bold ? "bold" : "normal",
              fontStyle: italian ? "italic" : "normal",
              textDecorationLine: underline ? "underline" : "none",
              fontSize: font,
              textAlign: align,
              textTransform: currCase,
            },
          ]}
          onChangeText={(text) => settext(text)}
          value={text}
          multiline
          placeholder="Type something..."
        />
        
        <ScrollView contentContainerStyle={styles.cont}>
        <TextInput
         multiline
          placeholder="ANALYSIS"
          style={styles.analysis}
          value={JSON.stringify(Analysis, null, "\t")}
          editable={false}
        />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = {
    container: {
        flexGrow: 1,
        backgroundColor: "#f8f8f8",
        paddingVertical: 20,
      },
      cont: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
      },
      editorcomp: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 20,
      },
      headingContainer: {
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 25,
        borderRadius: 50,
        marginBottom: 20,
      },
      buttonContainer: {
        marginBottom: 10,
        borderRadius: 50,
      },
      buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      },
      heading: {
        fontSize: 35,
        fontWeight: "800",
        textTransform: "uppercase",
      },
      textarea: {
        padding: 12,
        fontSize: 16,
        backgroundColor: "#d1cfcf",
        marginBottom: 20,
        borderRadius: 10,
      },
      analysis: {
        width: '100%', // Expand to fit the container
        paddingHorizontal: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      textButton: {
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      buttonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "700",
      },
};

export default Editor;




