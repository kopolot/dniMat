import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [count,setCount]=useState(''),
        [current,setCurret]=useState(),
        // on day de facto
        [onHour,setOnHour]=useState('');
        today=new Date(),
        maxPages=1600,
        maturaDay=new Date('2024-05-01'),
        refreshData=()=>{
          today=new Date();
          setCount((maturaDay-today)/60000)
          countHours()
        },
        numberWithSpaces=number=>{
          let string=String(Math.ceil(number));
          string=string.split('').reverse().map((v,k)=>(((k+1)%3===0&&string[k+1]!==undefined)?' '+v:v))
          return string.reverse().join('');
        },
        countHours=()=>{
          setOnHour( ( maxPages - current ) / ( count / 1440 ) );
        },
        setPages=async (text)=>{
          setCurret(text);
          await AsyncStorage.setItem('pages',text)
        },
        getPages=async()=>{
          const value=await AsyncStorage.getItem('pages');
          setCurret(value)
        }
      
  useEffect(()=>{
    getPages()
    refreshData();
    const intervalId=setInterval(refreshData,8.4);
    return ()=>clearInterval(intervalId);
  },[]);

  return (
    <View style={styles.container}>
        <Text style={{...styles.text,fontSize:26}}>
            Do matury zostało
        </Text>
        <Text style={styles.text}>
            {numberWithSpaces(count)} minut.{"\n"}
            {numberWithSpaces(count/60)} godzin.{"\n"}
            {numberWithSpaces(count/1440)} dni.{"\n"}
        </Text>
        <Text style={{...styles.text,fontSize:26}}>
            Wpisz ilość przerobionych stron
        </Text>
        <TextInput
          onChangeText={setPages}
          value={current}
          placeholder='_'
          keyboardType="numeric"
          style={styles.text}
          placeholderTextColor="#fff"
        />
        {Boolean(onHour) && (
          <Text style={styles.text}>
            {"\n"}
            Musisz przerobić średnio {"\n"} {onHour.toFixed(4)} stron dziennie.
            {"\n"} Czyli {(onHour/4).toFixed(4)} stron na godzine, {"\n"}zakładajac 4h nauki codziennie.
          </Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color:'#fff',
    fontSize:22
  }
});
