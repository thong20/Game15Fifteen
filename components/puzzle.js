//import liraries
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import { Audio } from "expo-av";
import LottieView from 'lottie-react-native'
import Constants from 'expo-constants';

const soundClick = require('../assets/sound/click-sound.mp3')
const soundHandsClapping = require('../assets/sound/hands-clapping.mp3')
const soundError = require('../assets/sound/error-mix.mp3')
const animationCongra = require('../assets/lottieJSON/congratulation.json')
const animationError = require('../assets/lottieJSON/error.json')

function Puzzle(){
	const [sound, setSound] = useState()
  const [congratulation, setCongratulation] = useState(false)
  const [error, setError] = useState(false)

  const refCongra = useRef()
  const refError = useRef()

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

  const showAlert = (DATA) => {
    let count = 0;
    for (let i in DATA) {
      if (DATA[i] === array[i]) {
        count++;
      }
    }
    if (count === 15) {
      _playSound(soundHandsClapping)
      setCongratulation(true)
      setError(false)
      // ref.current.reset()
      // ref.current.play(0, 100)
      // return Alert.alert("Congratulation")
      
    } else {
      _playSound(soundError)
      setError(true)
      setCongratulation(false)
      // return Alert.alert("OOP!!!");
    }
  };

  const getAdjacentCells = () => {
    let emptyCell = DATA.indexOf('') + 1
    let adjacent = []
    if(emptyCell % 4 === 0){ // right
      //               [ up, down, left, right]
      adjacent = [emptyCell - 4, emptyCell + 4, emptyCell - 1].filter(cell => cell > 0 && cell <= DATA.length)
      // console.log(adjacent.map(x => DATA[x - 1])) // vì emptyCell + 1 nên ta phải - lại 1
      // console.log('line: 60 ===============')
      return adjacent
    }
    if(emptyCell % 4 === 1){ // left
      adjacent = [emptyCell - 4, emptyCell + 4, emptyCell + 1].filter(cell => cell > 0 && cell <= DATA.length)
      // console.log(adjacent.map(x => DATA[x - 1])) // vì emptyCell + 1 nên ta phải - lại 1
      // console.log('line: 66 ===============')
      return adjacent
    }
    if(emptyCell / 4 > 0 && emptyCell / 4 < 1){ // 1, 2, 3
      adjacent = [emptyCell - 4, emptyCell + 4, emptyCell - 1 , emptyCell + 1].filter(cell => cell > 0)
      // console.log(adjacent.map(x => DATA[x - 1])) // vì emptyCell + 1 nên ta phải - lại 1
      // console.log('line: 72 =======================')
      return adjacent
    }

    // line bottom
    adjacent = [emptyCell - 4, emptyCell + 4, emptyCell - 1, emptyCell + 1].filter(cell => cell < 17)
    // console.log(adjacent.map(x => DATA[x - 1])) // vì emptyCell + 1 nên ta phải - lại 1
    // console.log(adjacent)
    // console.log('line: 81 ======================')
    return adjacent
  }

  const shuffle = (array) => {
    // let arrNew = array.sort(() => Math.random() - 0.5);
    // setDATA([...arrNew, ""]);
    for(let i = 1 ; i <= 100 ; i++){
      const adjacent = getAdjacentCells()
      const random = Math.floor(Math.random() * 200) % 4
      const index = adjacent[random] - 1
      const item = DATA[index]
      // console.log('item:', item)
      // console.log('index:', index)
      if(adjacent[random] != undefined){
        _handlerTouch(item, index)
      }
    }
    // console.log(adjacent[random])
  };

  const _playSound = async (path) => {
		const sound = new Audio.Sound()
		try{
			await sound.loadAsync(path);
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
          onPress={() => _handlerTouch(item, index, _playSound(soundClick))}
        >
          <Text style={styles.myTile}>{item}</Text>
        </TouchableOpacity>
      );
    }
  };

	const _renderAnimation = (type, ref, animationPath) => {
    return (
      <LottieView
        ref={animation => ref.current = animation}
        loop={false}
        // autoPlay
        style={styles.lottieAnimation}
        onAnimationFinish={() => {
          if(type === 'congratulation'){
            setCongratulation(false)
          }
          if(type === 'error'){
            setError(false)
          }
        }}
        source={animationPath}
      />
    )
  }

	useEffect(() => {
		return sound
			? () => {
				sound.unloadAsync()
			}
			: undefined
	}, [sound])

  useEffect(() => {
    if(congratulation){
      // refCongra.current.reset()
      refCongra.current.play(0, 100)
    }
    if(error){
      // refError.current.reset()
      refError.current.play()
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>15 Puzzle</Text>
        {
          congratulation === true
          ? _renderAnimation('congratulation', refCongra, animationCongra)
          : null
        }
        {
          (error === true)
          ? _renderAnimation('error', refError, animationError)
          : null
        }
      <View style={{flex: 1}}>
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
          <TouchableOpacity onPress={() => showAlert(DATA)} style={styles.btn}>
            <Text style={styles.titleBtn}>KIỂM TRA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => shuffle()}
            style={styles.btn}
          >
            <Text style={styles.titleBtn}>XÁO TRỘN</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.footer}>
        <Text>Version: {Constants.manifest.version}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 60,
    color: "coral",
  },
  lottieAnimation: {
    width: '100%',
    height: '90%',
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 999,
  },
  grid: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 3,
    margin: 20,
    alignItems: "center",
    // position: 'relative'
    
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
    width: 120,
    // height: 110,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  titleBtn: {
    fontSize: 18,
    color: 'white',
    // textTransform: 'uppercase'
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 40,
    paddingBottom: 20
  }
});

export default Puzzle;
