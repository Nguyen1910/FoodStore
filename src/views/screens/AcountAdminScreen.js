import React from "react";
import {
  Dimensions,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import accountApi from "../../api/accountApi";
import COLORS from "../../consts/colors";
import FormInput from "../components/FormInput";
import {
  documentDirectory,
  downloadAsync,
  EncodingType,
  readAsStringAsync,
  StorageAccessFramework,
  writeAsStringAsync,
} from "expo-file-system";
import { Base64 } from "js-base64";
import { scheduleNotificationAsync } from "expo-notifications";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.15;
const buttonWidth = width / 3;

const AcountAdminScreen = ({ navigation }) => {
  const [token, setToken] = React.useState("");
  const [idProduct, setIdProduct] = React.useState("");
  const [order, setOrder] = React.useState([]);
  const [idOrder, setIdOrder] = React.useState();
  const [addressOrder, setAdressOrder] = React.useState();
  const [listProduct, setListProduct] = React.useState([]);
  const [downloading, setDownloading] = React.useState(false);

  React.useEffect(() => {
    const getAllAcc = async () => {
      try {
        const result = await accountApi.getAll();
        setOrder(result);

        setIdOrder(result[0].maDonHang);
      } catch (error) {
        console.log(error);
      }
    };
    getAllAcc();
  }, []);

  const submit = async () => {
    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permission) {
      alert("Bạn cần cho phép truy cập bộ nhớ ");
      return;
    }

    const downloadUri = "https://www.orimi.com/pdf-test.pdf";
    const fileName = "pdf";
    const fileUri = documentDirectory + fileName + ".pdf";
    setDownloading(true);
    try {
      const response = await downloadAsync(downloadUri, fileUri);

      const newUri = await StorageAccessFramework.createFileAsync(
        permission.directoryUri,
        fileName,
        "application/pdf"
      );

      const base64 = await readAsStringAsync(response.uri, {
        encoding: EncodingType.Base64,
      });

      const write = await writeAsStringAsync(newUri, base64, {
        encoding: EncodingType.Base64,
      });
      scheduleNotificationAsync({
        content: {
          title: fileName,
          body: "Đã tải xuống",
        },
        trigger: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ListOrder = () => {
    return (
      <FlatList
        horizontal
        data={order}
        keyExtractor={(item, index) => `${item.maTaiKhoan}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              marginTop: 20,
              width: cardWidth,
              height: 150,
              borderRadius: 10,
              borderColor: COLORS.secondary,
              padding: 2,
            }}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <View>
              <Text>Mã tài khoản: {item.maTaiKhoan}</Text>
              <Text>Tên tài khoản: {item.tenTaiKhoan}</Text>
              <Text>Họ tên: {item.hoVaTen}</Text>
              <Text>Địa chỉ: {item.diaChi}</Text>
              <Text>Số điện thoại : {item.soDienThoai}</Text>
              <Text>Trạng thái : {item.trangThai}</Text>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Danh sách tài khoản</Text>
        </View>
      </View>

      <ScrollView>
        <View>
          <ListOrder />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  categoriesListContainer: {
    paddingVertical: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },

  btnAddProduct: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default AcountAdminScreen;
