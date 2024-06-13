import { Alert, Button, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Screen2 = () => {
  const [data, setData] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [id, setId] = useState("")
  const [hoTen, setHoTen] = useState("")
  const [gioiTinh, setGioiTinh] = useState("")
  const [ngaySinh, setNgaySinh] = useState("")
  const [hopDongChinhThuc, setHopDongChinhThuc] = useState(true)
  const [hinhAnh, setHinhAnh] = useState("")
  const [trangThai, setTrangThai] = useState("")
  const [updateHoTen, setUpdateHoTen] = useState("")
  const [updateGioiTinh, setUpdateGioiTinh] = useState("")
  const [updateNgaySinh, setUpdateNgaySinh] = useState("")
  const [updateHopDongChinhThuc, setUpdateHopDongChinhThuc] = useState(true)
  const [updateHinhAnh, setUpdateHinhAnh] = useState("")

  const fetchData = async () => {
    try {
      const retrieve = await fetch("http://192.168.0.101:3000/NhanVien/")
      const json = await retrieve.json()
      setData(json)
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateData = async (id) => {
    try {
      if (gioiTinh == "" || hoTen == "" || ngaySinh == "" || hinhAnh == "") {
        Alert.alert("Nhập Rỗng")
        return
      }
      if (gioiTinh !== "Nam" && gioiTinh !== "Nữ") {
        Alert.alert("Giới tính phải là nam và nữ")
        return
      }
      if (trangThai == "true") {

      }
      let obj = {
        hoTen_PH33497: updateHoTen,
        hopDongChinhThuc_PH33497: updateHopDongChinhThuc,
        ngaySinh_PH33497: updateNgaySinh,
        hinhAnh_PH3397: updateHinhAnh,
        gioiTinh_PH33497: updateGioiTinh
      }
      fetch("http://192.168.0.101:3000/NhanVien/" + id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      }).then((res) => {
        if (res.status == 200) {
          setShowAddModal(false)
          fetchData()
          Alert.alert("Thêm Thành Công")
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  const addData = async () => {
    try {
      if (gioiTinh == "" || hoTen == "" || ngaySinh == "" || hinhAnh == "" || trangThai == "") {
        Alert.alert("Nhập Rỗng")
        return
      }
      if (gioiTinh !== "Nam" && gioiTinh !== "Nữ") {
        Alert.alert("Giới tính phải là nam và nữ")
        return
      }
      let isHopDongChinhThuc = trangThai.toLowerCase() === "true";

      let obj = {
        hoTen_PH33497: hoTen,
        hopDongChinhThuc_PH33497: isHopDongChinhThuc,
        ngaySinh_PH33497: ngaySinh,
        hinhAnh_PH3397: hinhAnh,
        gioiTinh_PH33497: gioiTinh
      }
      fetch("http://192.168.0.101:3000/NhanVien/", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
      }).then((res) => {
        if (res.status == 200) {
          setShowAddModal(false)
          fetchData()
          Alert.alert("Thêm Thành Công")
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  const showDetail = (item) => {
    setShowDetailModal(true)
    setId(item.id)
    setGioiTinh(item.gioiTinh_PH33497)
    setHoTen(item.hoTen_PH33497)
    setNgaySinh(item.ngaySinh_PH33497)
    setHopDongChinhThuc(item.hopDongChinhThuc_PH33497)
    setHinhAnh(item.hinhAnh_PH3397)
  }


  const deleteItem = (id) => {
    Alert.alert(
      "Xóa Nhân Viên",
      "Bạn có chắc chắn muốn xóa nhân viên này không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => {
            fetch("http://192.168.0.101:3000/NhanVien/" + id, {
              method: "DELETE"
            }).then((res) => {
              if (res.status == 200) {
                fetchData();
              }
            }).catch(err => console.log(err))
          },
          style: "destructive"
        }
      ]
    );
  }
  return (
    <View style={{ flex: 1, padding: 12, }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Button title='Thêm' onPress={() => setShowAddModal(true)} />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ backgroundColor: 'olive', marginVertical: 12, padding: 12, flex: 1, borderRadius: 12 }} onPress={() => showDetail(item)}>
                <Image source={{ uri: item.hinhAnh_PH3397 }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>{item.hoTen_PH33497}</Text>
                  <Text>{item.gioiTinh_PH33497}</Text>
                </View>
                <Text>{item.hopDongChinhThuc_PH33497 ? "Chính Thức" : "Thử Việc"}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={{ fontSize: 12 }}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Text style={{ fontSize: 12 }}>Xóa</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
      <Modal visible={showDetailModal} transparent animationType='slide'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 400, height: 350, backgroundColor: 'papayawhip', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
            <Image source={{ uri: hinhAnh }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
            <Text>{id}</Text>
            <Text>{hoTen}</Text>
            <Text>{gioiTinh}</Text>
            <Text>{ngaySinh}</Text>
            <Text>{hopDongChinhThuc ? "Chính Thức" : "Thử Việc"}</Text>
            <Button title='Tắt' onPress={() => setShowDetailModal(false)} />
          </View>
        </View>
      </Modal>
      <Modal visible={showAddModal} transparent animationType='slide'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 400, height: 500, backgroundColor: 'papayawhip', justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 30 }}>
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setHoTen(txt)} placeholder='Họ Tên' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setGioiTinh(txt)} placeholder='Giới Tính' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setHinhAnh(txt)} placeholder='Hình ảnh ' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setNgaySinh(txt)} placeholder='Ngày Sinh' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setTrangThai(txt)} placeholder='Hợp Đồng Chính Thức' />
            <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
              <Button title='Thêm' onPress={() => addData()} style={{ marginVertical: 12 }} />
            </View>
            <Button title='Tắt' onPress={() => setShowAddModal(false)} style={{ marginVertical: 12 }} />
          </View>
        </View>
      </Modal>
      <Modal visible={showUpdateModal} transparent animationType='slide'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 400, height: 500, backgroundColor: 'papayawhip', justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 30 }}>
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setHoTen(txt)} placeholder='Họ Tên' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setGioiTinh(txt)} placeholder='Giới Tính' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setHinhAnh(txt)} placeholder='Hình ảnh ' />
            <TextInput style={{ borderWidth: 1, borderRadius: 12, marginVertical: 12, marginHorizontal: 12, width: '100%', }} onChangeText={(txt) => setNgaySinh(txt)} placeholder='Ngày Sinh' />
            <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
              <Button title='Thêm' onPress={() => addData()} style={{ marginVertical: 12 }} />
            </View>
            <Button title='Tắt' onPress={() => setShowAddModal(false)} style={{ marginVertical: 12 }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Screen2

const styles = StyleSheet.create({})