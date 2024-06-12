import { Alert, Button, FlatList, Image, Modal, SafeAreaView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Main = () => {
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [id, setId] = useState("")
  const [hoTen, setHoTen] = useState("")
  const [hinhAnh, setHinhAnh] = useState("")
  const [hopDong, setHopDong] = useState("")
  const [gioiTinh, setGioiTinh] = useState("")
  const [ngaySinh, setNgaySinh] = useState("")
  const [addHoTen, setAddHoTen] = useState("")
  const [addHinhAnh, setAddHinhAnh] = useState("")
  const [addHopDong, setAddHopDong] = useState(true)
  const [addGioiTinh, setAddGioiTinh] = useState("")
  const [AddNgaySinh, setAddNgaySinh] = useState("")
  const fetchData = async () => {
    try {
      const retrieve = await fetch("http://192.168.0.101:3000/job/")
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
    setHoTen(item.hoTen_PH33497)
    setHinhAnh(item.hinhAnh_PH33497)
    setHopDong(item.hopDong_PH333497)
    setNgaySinh(item.ngaySinh_PH333497)
    setGioiTinh(item.gioiTinh_PH33497)
  }

  const addData = async () => {
    if (addGioiTinh != "Nam" && addGioiTinh != "Nữ") {
      Alert.alert("Giới tính phải là nam và nữ")
      return
    }
    if(addHoTen == "" || addHoTen == "" || AddNgaySinh == ""){
      Alert.alert('Thông Tin Rỗng')
      return
    }
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    if (!datePattern.test(AddNgaySinh)) {
      Alert.alert('Ngày sinh phải có định dạng dd/mm/yyyy')
      return
    }

    let obj = {
      Id_PH33497: Math.random(),
      hoTen_PH33497: addHoTen,
      ngaySinh_PH333497:AddNgaySinh,
      hinhAnh_PH33497: addHinhAnh,
      hopDong_PH333497: addHopDong,
      gioiTinh_PH33497: addGioiTinh,
    }

    fetch("http://192.168.0.101:3000/job/", {
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
          setAddGioiTinh("")
          setAddHinhAnh("")
          setAddHoTen("")
          setAddNgaySinh("")
          fetchData()
        }
      })
      .catch((err) => {
        console.log("Lỗi Thêm", err);
      });
  }

  const deleteData = async (itemId) => {
    fetch(`http://192.168.0.101:3000/job/` + itemId, {
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
          keyExtractor={(item) => item.Id_PH33497}
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
                <Image source={{ uri: item.hinhAnh_PH33497 }}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 12,
                    borderRadius: 25
                  }} />
                <View style={styles.textContainer}>
                  <Text style={styles.text}>Id: {item.Id_PH33497}</Text>
                  <Text style={styles.text}>Họ Tên: {item.hoTen_PH33497}</Text>
                  <Text style={styles.text}>Giới Tính: {item.gioiTinh_PH33497}</Text>
                  <Text style={styles.text}>Ngày Sinh: {item.ngaySinh_PH333497}</Text>
                  <Text style={styles.text}>Trạng Thái: {item.hopDong_PH333497 ? "Thử Việc" : "Chính Thức"}</Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 20 }}>
                  <Button onPress={() => deleteData(item.id)} title='Xóa' />
                </View>

              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
      <Modal visible={showModal} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: hinhAnh }} style={styles.modalImage} />
            <Text style={styles.modalText}>Id : {id}</Text>
            <Text style={styles.modalText}>Họ và tên :{hoTen}</Text>
            <Text style={styles.modalText}>Giới Tính :{gioiTinh}</Text>
            <Text style={styles.modalText}>Ngày Sinh :{ngaySinh}</Text>
            <Text style={styles.modalText}>Trạng Thái :{hopDong ? "Chính Thức" : "Thử việc"}</Text>
            <Button onPress={() => setShowModal(false)} title='Tắt' />
          </View>
        </View>
      </Modal>
      <Modal visible={showAddModal} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Họ và Tên"
              value={addHoTen}
              onChangeText={setAddHoTen}
              style={styles.input}
            />
            <TextInput
              placeholder="URL"
              value={addHinhAnh}
              onChangeText={setAddHinhAnh}
              style={styles.input}
            />
         
            <TextInput
              placeholder="Giới Tính"
              value={addGioiTinh}
              onChangeText={setAddGioiTinh}
              style={styles.input}
            />   
               <TextInput
              placeholder="Ngày Sinh"
              value={AddNgaySinh}
              onChangeText={setAddNgaySinh}
              style={styles.input}
            />   
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={addHopDong ? '#f5dd4b' : '#f4f3f4'}
              onValueChange={() => setAddHopDong(!addHopDong)}
              value={addHopDong}
            />
            <Button title="Thêm" onPress={addData} style={{ marginBottom: 5 }} />
            <Button title="Hủy" onPress={() => {
              setShowAddModal(false)
              setAddGioiTinh("")
              setAddHinhAnh("")
              setAddHoTen("")
              setAddNgaySinh("")
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
