import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert,Share } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { db, delete_food, edit_food } from './Database';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ViewDeatils({ route, navigation }) {


    //   hooks for storing data required for database table
    const [edit, setedit] = useState(false)
    const [name, setname] = useState()
    const [price, setprice] = useState()
    const [image, setImage] = useState()




    const [description, setDescription] = useState()



    const { data, fetch_all } = route.params



    const leftAction = () => {






        return (
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => {

                    delete_food(data.ID)
                    fetch_all()
                    navigation.navigate('home')



                }} style={{ borderRadius: 10, width: 100, height: 60, backgroundColor: '#e52b50', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>deleted</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const current = new Date()

    const uploadImage = () => {


        Alert.alert('message', 'upload image to continue', [{

            text: 'gallery',
            onPress: async () => {
                const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (result.granted) {
                    const input = await ImagePicker.launchImageLibraryAsync({
                        quality: 1,
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true
                    })

                    if (input.cancelled) {
                        alert('post action terminated')
                    } else {

                        setImage(input.uri)

                        //        db.transaction(trans=>{
                        //      trans.executeSql('INSERT INTO SHOP (name,description,price,image,post_date) values (?,?,?,?,?)',[name,description,price,input.uri,`${current.getDate()}/${current.getMonth()}/${current.getFullYear()}`],
                        //      (object,{rows:{_array}})=>props.updateRecord(),
                        //      ()=>console.log('something went wrong'))
                        //    })



                    }
                }
            }
            ,
            style: 'default'

        },
        {
            text: 'camera',
            onPress:async () => {
                const result = await ImagePicker.requestCameraPermissionsAsync();

                if (result.granted) {
                    const input = await ImagePicker.launchCameraAsync({
                        quality: 1,
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true
                    })

                    if (input.cancelled) {
                        alert('post action terminated')
                    } else {

                        setImage(input.uri)

                    


                    }
                }
            },
            style: 'default'
        }])


    }



    return (
        <Swipeable
            renderLeftActions={leftAction}

            friction={0.4}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: data.IMAGE }} resizeMode='cover' style={styles.image} ></Image>
                <View style={{ justifyContent: 'space-between',width:210 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 15 }}>{data.NAME}</Text>
                    <Text style={{ fontSize: 10, fontWeight: '400',textAlign:'center' }}>{data.DESCRIPTION}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '500'}}>Date: {data.POST_DATE}</Text>
                    <Text style={{ fontSize: 20, fontWeight: '900', marginBottom: 15 }}>£ {data.PRICE}</Text>
                </View>
            </View>

            {edit === true ?

                <View style={{ width: '100%', height: Dimensions.get('window').height, alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#efdecd', width: Dimensions.get('window').width - 20, height: 900 }}>
                        <TextInput onChangeText={(text) => setname(text)} style={{ paddingLeft: 10, marginTop: 10, backgroundColor: 'white', width: 300, height: 50, borderRadius: 10 }} placeholder='food name'></TextInput>

                        <TextInput onChangeText={(text) => setprice(text)} style={{ paddingLeft: 10, marginTop: 10, backgroundColor: 'white', width: 300, height: 50, borderRadius: 10 }} placeholder='food price'></TextInput>

                        <TextInput onChangeText={(text) => setDescription(text)} multiline style={{ paddingLeft: 10, marginTop: 10, backgroundColor: 'white', width: 300, height: 70, borderRadius: 10 }} placeholder='food description'></TextInput>

                        <View style={{ flexDirection: 'row', width: 220, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => {

                                uploadImage()



                            }} style={{ marginTop: 20, alignSelf: 'center', borderRadius: 10, width: 100, height: 60, backgroundColor: '#e52b50', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>upload image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {


                                edit_food(name, image, price, description, data.ID)



                                fetch_all()
                                navigation.navigate('home')



                                setedit(false)



                            }} style={{ marginTop: 20, alignSelf: 'center', borderRadius: 10, width: 100, height: 60, backgroundColor: '#e52b50', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                :


                <View style={{flexDirection:'row',width:300,justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={() => {

                        setedit(true)



                    }} style={{ alignSelf: 'center', borderRadius: 10, width: 100, height: 60, backgroundColor: '#e52b50', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {

                        
                    Share.share({message:data.IMAGE})


                    }} style={{ alignSelf: 'center', borderRadius: 10, width: 100, height: 60, backgroundColor: '#e52b50', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Share</Text>
                    </TouchableOpacity>
                </View>
            }

        </Swipeable>
    )
}

const styles = StyleSheet.create({

    image: {

        width: 180, height: 130, borderRadius: 15, margin: 15

    },
})