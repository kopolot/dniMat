import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count,setCount]=useState(0);
  var today=new Date(),
      maturaDay=new Date('2024-05-01'),
      refreshData=()=>{
        today=new Date();
        setCount((maturaDay-today)/6000)
      },
      numberWithSpaces=number=>{
        let string=String(Math.ceil(number));
        string=string.split('').reverse().map((v,k)=>(((k+1)%3===0)?' '+v:v))
        return string.reverse().join('');
      }

  useEffect(()=>{
    const intervalId=setInterval(refreshData, 5000);
    return ()=>clearInterval(intervalId);
  },[]);

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            {numberWithSpaces(count)} minut do matury,{"\n"}
            {numberWithSpaces(count/60)} godzin,{"\n"}
            {/* tu zrobir niputa do liczenia */}
        </Text>
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
