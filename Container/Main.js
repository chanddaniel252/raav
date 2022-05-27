import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity,Alert,Keyboard } from 'react-native';
import Title from './Title';
import { create_table, db } from './Database';
import Body from './Body';
import { Swipeable } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';


export default function Main({ navigation }) {

    const [foods, setFoods] = useState([])


    const [name, setname] = useState()
    const [price, setprice] = useState()
    const [image, setImage] = useState()
    const [description, setDescription] = useState()


    const [basket,setBasket]=useState([]);



    const current = new Date()

    useEffect(() => {

        create_table()    //create table if not exist
        fetch_all()  //fetch all data from database


    setBasket([])



    }, [fetch_all])



    const fetch_all = () => {

        db.transaction(trans => {
            trans.executeSql('SELECT * FROM SHOP', null,
                (object, { rows: { _array } }) => setFoods(_array),
                () => console.log('something went wrong'))
        })
    }




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

                       

                 


                    }
                }
            },
            style: 'default'
        }])


    }



    const leftAction = () => {

        return (
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



                            db.transaction(trans => {
                                trans.executeSql('INSERT INTO SHOP (name,description,price,image,post_date) values (?,?,?,?,?)', [name, description, price, image, `${current.getDate()}/${current.getMonth()}/${current.getFullYear()}`],
                                    (object, { rows: { _array } }) => fetch_all(),
                                    () => console.log('something went wrong'))
                            })

                            alert('new food item added')
                            Keyboard.dismiss()



                        }} style={{ marginTop: 20, alignSelf: 'center', borderRadius: 10, width: 100, height: 60, backgroundColor: '#e52b50', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }

    return (

        <Swipeable
            renderLeftActions={leftAction}
            friction={0.2}
        >
            <View style={{height:'100%'}}>
                <Title setFoods={setFoods} foods={foods} basket={basket} fetch_all={fetch_all} setBasket={setBasket}/>
                <Body foods={foods} navigation={navigation} fetch_all={fetch_all} setBasket={setBasket} basket={basket} />
            </View>
        </Swipeable>


    );
}


