import { View, Text, Dimensions, Image, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { useState } from 'react';


export default function Body(props) {



const fillBasket = (id) => {






    if (props.basket.includes(id)) {
        alert(id + ' already added to basket')
    } else {

        props.setBasket([...props.basket, id])

          console.log(props.basket)
    }





}


    return (
    //   <View style={{height:Dimensions.get('screen').height/1.5,alignItems:'center',justifyContent:'center'}}>
           <ScrollView >
            <View style={{justifyContent:'center',flexDirection:'row',flexWrap:'wrap'}}>
       { props.foods && props.foods.map((food, index) =>
            <TouchableOpacity 

            
            onLongPress={()=>{

                fillBasket(food.ID)
                
            }}
            key={index} style={{ width:Dimensions.get('screen').width/2-50,
            margin:10}} onPress={()=>
            props.navigation.navigate('view',{data:food,fetch_all:props.fetch_all})}>

                {props.basket.includes(food.ID) ? <View style={{position:'absolute',width:40,height:40,backgroundColor:'#ffbf00',zIndex:4,borderRadius:10}}></View>:null}
               
               
                <Image source={{ uri: food.IMAGE }} resizeMode='cover' style={body_styles.image} ></Image>
                <View style={body_styles.bar}>
                    <Text style={body_styles.text}>{food.NAME}</Text>
                </View>
            </TouchableOpacity>
        )}
        </View>
       </ScrollView>
     //  </View>
    )
}


const body_styles = StyleSheet.create({

    image: {

        width: '100%', height: 130, borderRadius:15

    },
    bar: {
        width: '100%',
        backgroundColor: 'gainsboro',
        position:'absolute',
        bottom:0,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        alignItems:'center'
    },
    card:{
       
        
       
    },
    text:{
        fontSize:15,
        fontWeight:'500'
    }
})