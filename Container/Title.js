
import { useState,useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { db, delete_food } from './Database';


function Title(props){


    const [data,setData]=useState([])


    useEffect(()=>{

        fetch_all()

     
    },[props.fetch_all])

const [search,setSearch]=useState()



const fetch_all = () => {

    db.transaction(trans => {
        trans.executeSql('SELECT * FROM SHOP', null,
            (object, { rows: { _array } }) => setData(_array),
            () => console.log('something went wrong'))
    })
}


const searchFood=(text)=>{

    setSearch(text)

    props.setFoods(data.filter(d=>d.NAME.toLowerCase().includes(text.toLowerCase())))
    
}
    return(
        <View style={{alignItems:'center',height:150,justifyContent:'center',flexDirection:'row'}}>
            <View style={{width:300}}>
          <SearchBar  round placeholder='search item here'
          searchIcon={{size:20}}
          onChangeText={(text)=>searchFood(text)}
          onClear={()=>setSearch()}
           value={search}
          >

          </SearchBar>
        </View>
        <TouchableOpacity
        onPress={()=>{

            props.basket.map((b,i)=>
            delete_food(b))
            props.setBasket([])
              alert('multiple item deleted')
            props.fetch_all()
        }}
        
        style={{marginLeft:20,width:70,height:70,borderRadius:60,alignItems:'center',justifyContent:'center',backgroundColor:'gainsboro'}}>
            <Text style={{fontSize:15,fontWeight:'500'}}>delete</Text>
            {props.basket && props.basket.length===0? null:
            <View style={{alignItems:'center',justifyContent:'center',position:'absolute',width:40,height:40,borderRadius:60,backgroundColor:'#ffbf00',top:-15,right:0}}>
            <Text style={{fontWeight:'600',fontSize:15}}>{props.basket && props.basket.length}</Text>
        </View>}
        </TouchableOpacity>
        </View>
    )



}

export default Title;