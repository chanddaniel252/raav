import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('SHOPDB')

function create_table() {


  db.transaction(trans => {
    trans.executeSql('CREATE TABLE IF NOT EXISTS SHOP (ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, DESCRIPTION TEXT, PRICE NUMBER, IMAGE TEXT, POST_DATE DATE)', null,
      () => console.log('table created'),
      () => console.log('something went wrong'))
  })



}

function delete_food(id) {
  db.transaction(trns => {
    trns.executeSql("DELETE FROM SHOP WHERE ID = (?)", [id])
  })
}


function edit_food(name,image,price,description,id){

  const current=new Date()
  db.transaction(tr=>{
      tr.executeSql('UPDATE SHOP set NAME= ? , DESCRIPTION= ?, IMAGE= ?, PRICE= ?  , POST_DATE=?  WHERE ID = ?'
      ,[name,description,image,price,`${current.getDate()}/${current.getMonth()}/${current.getFullYear()}`,id],
      ()=>
          alert('data updated')
          
        
      ,
      ()=>alert('something went wrong'))
  })
}



export { create_table, db ,delete_food,edit_food}