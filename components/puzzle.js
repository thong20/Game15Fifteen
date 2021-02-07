//import liraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  WebView,
} from "react-native";

import { Audio } from "expo-av";

// create a component

const showAlert = (data, array) => {
  let count = 0;
  for (let i in data) {
    if (data[i] === array[i]) {
      count++;
    }
  }
  if (count === 15) {
    return Alert.alert("Congratulation");
  } else {
    return Alert.alert("OOP!!!");
  }
};

function Puzzle(){
	const [sound, setSound] = useState()
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [DATA, setDATA] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    "",
  ]);

  const shuffle = (array) => {
    let arrNew = array.sort(() => Math.random() - 0.5);
    setDATA([...arrNew, ""]);
  };

  const _playSound = async () => {

		const sound = new Audio.Sound()
		try{
			await sound.loadAsync(require('../assets/sound/click-sound.mp3'));
			await sound.playAsync();
			setSound(sound)
			// await sound.unloadAsync();
		}catch(e){
			console.log(e)
			consoleLog(72)
		}
	};

  const _handlerTouch = (item, index) => {
    const dataTmp = DATA;
    const indexEmpty = dataTmp.indexOf("");

    function showIndexEmpty(item, index, indexEmpty) {
      dataTmp[index] = "";
      dataTmp[indexEmpty] = item;
    }

    switch (indexEmpty) {
      case 0:
        if (index === 1 || index === 4) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 1:
        if (index === 0 || index === 2 || index === 5) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 2:
        if (index === 1 || index === 6 || index === 3) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 3:
        if (index === 2 || index === 7) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 4:
        if (index === 0 || index === 5 || index === 8) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 5:
        if (index === 1 || index === 4 || index === 6 || index === 9) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 6:
        if (index === 2 || index === 5 || index === 7 || index === 10) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 7:
        if (index === 3 || index === 6 || index === 11) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 8:
        if (index === 4 || index === 9 || index === 12) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 9:
        if (index === 5 || index === 8 || index === 10 || index === 13) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 10:
        if (index === 6 || index === 9 || index === 11 || index === 14) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 11:
        if (index === 7 || index === 10 || index === 15) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 12:
        if (index === 8 || index === 13) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 13:
        if (index === 9 || index === 12 || index === 14) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 14:
        if (index === 10 || index === 13 || index === 15) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      case 15:
        if (index === 11 || index === 14) {
          showIndexEmpty(item, index, indexEmpty);
        }
        break;
      default:
        break;
    }
    setDATA([...dataTmp]);
  };

  const _renderItem = ({ item, index }) => {
    if (item === "") {
      return <View style={{ width: 70, height: 70, margin: 3 }} />;
    } else {
      return (
        <TouchableOpacity
          style={styles.cell}
          onPress={() => _handlerTouch(item, index, _playSound())}
        >
          <Text style={styles.myTile}>{item}</Text>
        </TouchableOpacity>
      );
    }
  };

	useEffect(() => {
		return sound
			? () => {
				sound.unloadAsync()
			}
			: undefined
	}, [sound])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>15 Puzzle</Text>
      <View style={styles.grid}>
        <FlatList
          // data={arr}
          data={DATA}
          numColumns={4}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.groupBtn}>
        <TouchableOpacity onPress={() => shuffle(array)} style={styles.btn}>
          <Text style={styles.titleBtn}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showAlert(DATA, array)}
          style={styles.btn}
        >
          <Text style={styles.titleBtn}>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 60,
    color: "coral",
  },
  grid: {
    // width: 360,
    // height: 360,
    // borderWidth: 1,
    // flex: 1,
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 3,
    margin: 20,
    alignItems: "center",
  },
  cell: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'coral',
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 3,
  },
  myTile: {
    fontSize: 42,
  },
  groupBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    backgroundColor: "coral",
    width: 110,
    // height: 110,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  titleBtn: {
    fontSize: 18,
    // color: 'coral'
  },
});

export default Puzzle;
