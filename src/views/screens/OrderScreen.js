import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import COLORS from "../../consts/colors";
import cartApi from "../../api/cartApi";
import { SecondaryButton } from "../components/Button";

const SHIPPING_FEE = 2000;

const OrderScreen = ({ navigation, route }) => {
  const token = route.params;
  const [order, setOrder] = React.useState([]);

  React.useEffect(() => {
    const getOrder = async () => {
      try {
        const result = await cartApi.getMyCart(token);
        setCart(result);
      } catch (error) {
        console.log(error, "Cart");
      }
    };
    getMyCart();
  }, [token]);

  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image
          source={require("../../assets/product.png" ||
            item.sanPham.anhSanPham)}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        />
        <View style={{ marginLeft: 15, paddingVertical: 20, flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: 20,
              height: 40,
              marginBottom: 5,
            }}
          >
            {item.sanPham.tenSanPham}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {item.sanPham.giaSanPham}đ
          </Text>
        </View>
      </View>
    );
  };

  function RenderCartList() {
    return (
      <SwipeListView
        data={cart}
        keyExtractor={(item, index) => index}
        contentContainerStyle={
          {
            // paddingBottom:60
          }
        }
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={({ item }) => <CartCard item={item} />}
        renderHiddenItem={({ item }) => (
          <View
            style={{
              ...styles.cartCard,
              backgroundColor: COLORS.primary,
              elevation: 0,
            }}
          >
            <Icon
              name="delete"
              size={40}
              style={{
                flex: 1,
                justifyContent: "flex-end",
                position: "absolute",
                top: 45,
                right: 20,
                color: COLORS.white,
              }}
              onPress={() => removeMyCartHandler(item.sanPham.maSanPham)}
            />
          </View>
        )}
      />
    );
  }

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
          Cart
        </Text>
      </View>
      {/* Cart List */}
      <RenderCartList />

      {/* Order Details */}
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.secondary,
          // elevation: ,
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        {/* Subtotal */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Subtotal</Text>
          <Text style={{ fontSize: 18 }}>{subtotal}đ</Text>
        </View>

        {/* Shipping Fee */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>Shipping fee</Text>
          <Text style={{ fontSize: 18 }}>{SHIPPING_FEE}đ</Text>
        </View>

        {/* Line */}
        <View
          style={{
            // border: '1px solid #ccc',
            backgroundColor: COLORS.light,
            height: 1,
            marginVertical: 10,
          }}
        ></View>

        {/* Total */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
        </View>

        {/* Button */}
        <SecondaryButton
          title="Thanh toán"
          btnContainerStyle={{
            backgroundColor: COLORS.primary,
            borderRadius: 30,
            paddingVertical: 10,
            marginVertical: 15,
          }}
          labelStyle={{
            color: COLORS.white,
          }}
          onPress={() => removeCart("myCart")}
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

export default OrderScreen;
