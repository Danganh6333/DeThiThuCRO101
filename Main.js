import { Alert, Button, FlatList, Image, Modal, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Main = () => {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [status, setStatus] = useState("")
  const [gender, setGender] = useState("")
  const [addName, setAddName] = useState("")
  const [addImage, setAddImage] = useState("")
  const [addStatus, setAddStatus] = useState(true)
  const [addGender, setAddGender] = useState("")
  const fetchData = async () => {
    try {
      const retrieve = await fetch("http://10.24.9.95:3000/job/")
      const json = await retrieve.json()
      setData(json)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const showDetail = (item) => {
    setShowModal(true)
    setId(item.ID_PH33497)
    setName(item.Name_PH33497)
    setImage(item.Image_PH33497)
    setStatus(item.Job_Status_PH333497)
    setGender(item.Gender_PH33497)
  }

  const addData = async () => {
    if (addGender != "Nam" && addGender != "Nữ") {
      Alert.alert("Giới tính phải là nam và nữ")
      return
    }
    let obj = {
      ID_PH33497: Math.random(),
      Name_PH33497: addName,
      Image_PH33497: addImage,
      Job_Status_PH333497: addStatus,
      Gender_PH33497: addGender,
    }

    fetch("http://10.24.9.95:3000/job/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Thêm thành công");
          setShowAddModal(false)
          setAddGender("")
          setAddImage("")
          setAddName("")
          fetchData()
        }
      })
      .catch((err) => {
        console.log("Lỗi Thêm", err);
      });
  }

  const deleteData = async (itemId) => {
    fetch(`http://10.24.9.95:3000/job/` + itemId, {
      method: "DELETE",
    }).then((result) => {
      if (result.status == 200) {
        alert("Xóa thành công");
        fetchData()
      }
    })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Thêm" onPress={() => setShowAddModal(true)} />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.ID_PH33497}
          contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  marginVertical: 6,
                  padding: 12,
                  backgroundColor: 'skyblue',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => showDetail(item)}
              >
                <Image source={{ uri: item.Image_PH33497 }}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 12,
                    borderRadius: 25
                  }} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Id: {item.ID_PH33497}</Text>
                  <Text style={styles.text}>Họ Tên: {item.Name_PH33497}</Text>
                  <Text style={styles.text}>Giới Tính: {item.Gender_PH33497}</Text>
                  <Text style={styles.text}>Trạng Thái: {item.Job_Status_PH333497 ? "Thử Việc" : "Chính Thức"}</Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 20 }}>
                  <Button onPress={() => deleteData(item.id)} title='Xóa' />
                  <Button onPress={() => deleteData(item.id)} title='Cập Nhật' />
                </View>

              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
      <Modal visible={showModal} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: image }} style={styles.modalImage} />
            <Text style={styles.modalText}>Id : {id}</Text>
            <Text style={styles.modalText}>Họ và tên :{name}</Text>
            <Text style={styles.modalText}>Giới Tính :{gender}</Text>
            <Text style={styles.modalText}>Trạng Thái :{status ? "Chính Thức" : "Thử việc"}</Text>
            <Button onPress={() => setShowModal(false)} title='Tắt' />
          </View>
        </View>
      </Modal>
      <Modal visible={showAddModal} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Họ và Tên"
              value={addName}
              onChangeText={setAddName}
              style={styles.input}
            />
            <TextInput
              placeholder="URL"
              value={addImage}
              onChangeText={setAddImage}
              style={styles.input}
            />
         
            <TextInput
              placeholder="Giới Tính"
              value={addGender}
              onChangeText={setAddGender}
              style={styles.input}
            />   
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={addStatus ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={() => setAddStatus(!addStatus)}
              value={addStatus}
            />
            <Button title="Thêm" onPress={addData} style={{ marginBottom: 5 }} />
            <Button title="Hủy" onPress={() => {
              setShowAddModal(false)
              setAddGender("")
              setAddImage("")
              setAddName("")
            }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({

  textContainer: {
    flex: 1,
  },
  text: {
    marginBottom: 4,
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
})
