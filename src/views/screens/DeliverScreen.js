import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import FormInput from "../components/FormInput";
import orderApi from "../../api/orderApi";
import cartApi from "../../api/cartApi";
import detailOrderApi from "../../api/detailOrderApi";

const PAYMENT = ["Thanh toán khi nhận hàng", "Thanh toán qua vi momo"];

const DeliverScreen = ({ navigation, route }) => {
  const [token] = route.params;
  const [receiver, setReceiver] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [receiverError, setReceiverError] = React.useState("");
  const [addressError, setAddressError] = React.useState("");
  const [cart, setCart] = React.useState([]);

  const [selectedPay, setSelectedPay] = React.useState(0);

  React.useEffect(() => {
    const getCart = async () => {
      const result = await cartApi.getCart(token);
      setCart(result);
    };
    getCart();
  }, []);

  const checkInput = () => receiver !== "" && address !== "";

  const handleOrder = async () => {
    if (checkInput) {
      try {
        const addOrder = await orderApi.addOrder({
          maTaiKhoan: token,
          nguoiNhan: receiver,
          diaChi: address,
        });
        addDetailOrder(addOrder.maDonHang);
        deleteCart();
        navigation.navigate("SuccessOrder");
      } catch (error) {
        console.log(error, "order");
      }
    }
  };

  const addDetailOrder = (maDonHang) => {
    cart.forEach(async (item) => {
      try {
        const detailOrder = await detailOrderApi.addDetailOrder(
          maDonHang,
          item.maSanPham,
          { soLuong: item.soLuong }
        );
      } catch (error) {
        console.log(error, "addDetailOrder");
      }
    });
  };

  const deleteCart = async () => {
    try {
      const deleteMyCart = await cartApi.deleteCart(token);
    } catch (error) {
      console.log(error, "deleteCart");
    }
  };

  const RadioPay = ({ text, icon, color, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Icon
            style={{
              color: COLORS.primary,
            }}
            name={icon}
            size={20}
          />
          <Text style={{ marginLeft: 15, fontSize: 18 }}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 30,
      }}
    >
      <View style={styles.header}>
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.navigate("Home")}
        />
        <Text
          style={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => navigation.navigate("Home")}
        >
          Deliver
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginTop: 30,
          paddingHorizontal: 20,
        }}
      >
        <FormInput
          lable="Người nhận"
          onChange={(value) => setReceiver(value)}
          errorMsg={receiverError}
        />
        <FormInput
          lable="Địa chỉ"
          onChange={(value) => setAddress(value)}
          errorMsg={addressError}
        />
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 18 }}>Phương thức thanh toán</Text>
          <View
            style={{
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 15,
              elevation: 13,
              backgroundColor: COLORS.white,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            {PAYMENT.map((item, index) => (
              <RadioPay
                key={index}
                text={item}
                icon={
                  selectedPay === index
                    ? "radio-button-checked"
                    : "radio-button-off"
                }
                onPress={() => setSelectedPay(index)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          elevation: 99,
        }}
      >
        <SecondaryButton
          title="Đặt hàng"
          btnContainerStyle={{
            backgroundColor: COLORS.primary,
            borderRadius: 30,
            paddingVertical: 15,
            width: 300,
            marginBottom: 30,
          }}
          labelStyle={{
            color: COLORS.white,
          }}
          onPress={handleOrder}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default DeliverScreen;
