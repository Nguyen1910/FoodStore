import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import { SecondaryButton } from "../components/Button";
import cartApi from "../../api/cartApi";
import StepperInput from "../components/StepperInput";
import sizes from "../../consts/sizes";
import productApi from "../../api/productApi";
import favoriteApi from "../../api/favoriteApi";

const DetailsScreen = ({ navigation, route }) => {
  const [idProduct, token] = route.params;
  const [product, setProduct] = React.useState({});
  const [myCart, setMyCart] = React.useState([]);
  const [isAdd, setIsAdd] = React.useState(true);
  const [selectedSize, setSelectedSize] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    const getProductById = async () => {
      try {
        const result = await productApi.getProductsById(idProduct);
        setProduct(result);
      } catch (error) {
        console.log(error, "getProductById");
      }
    };
    getProductById();
    const getFavorite = async () => {
      try {
        const result = await favoriteApi.getFavoriteByMaSP(token, idProduct);
        if (result.length === 0) {
          setIsFavorite(false);
        } else {
          setIsFavorite(true);
        }
      } catch (error) {
        console.log(error, "getFavorite");
      }
    };
    getFavorite();
  }, []);

  React.useEffect(() => {
    const getMyCart = async () => {
      try {
        const result = await cartApi.getProductCart(token);
        setMyCart(result);
      } catch (error) {
        console.log(error, "getMyCart");
      }
    };
    getMyCart();
  }, [isAdd]);

  React.useEffect(() => {
    const getFavorite = async () => {
      try {
        if (isFavorite) {
          const addFavorite = await favoriteApi.addFavorite(token, idProduct);
        } else {
          const addFavorite = await favoriteApi.deleteFavorite(
            token,
            idProduct
          );
        }
      } catch (error) {
        console.log(error, "getFavorite");
      }
    };
    getFavorite();
  }, [isFavorite]);

  const addToCart = async () => {
    try {
      if (myCart !== []) {
        let sl;
        const checkCart = myCart.find((product) => {
          sl = product.soLuong;
          return product.maSanPham === idProduct;
        });
        if (checkCart) {
          const add = await cartApi.updateCart(token, idProduct, {
            soLuong: qty + sl,
          });
          sl = 0;
        } else {
          const add = await cartApi.addCart(token, idProduct, {
            soLuong: qty,
          });
          sl = 0;
        }
        setIsAdd(!isAdd);
      }
    } catch (error) {
      console.log(error, "addProduct");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, marginTop: 30 }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail</Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            BackgroundColor: COLORS.primary,
          }}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <Icon name="shopping-bag" size={28} />
          <View
            style={{
              position: "absolute",
              top: 4,
              right: 2,
              height: 15,
              width: 15,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                fontSize: 10,
              }}
            >
              {myCart.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primary,
              width: 50,
              height: 50,
              borderRadius: 25,
              position: "absolute",
              zIndex: 1,
              top: 15,
              right: 85,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: COLORS.white, fontSize: 15, fontWeight: "bold" }}
            >
              {product.giamGia}%
            </Text>
          </View>
          <Image
            source={require("../../assets/product.png") || product.anhSanPham}
            style={{ height: 220, width: 220 }}
          />
        </View>
        <View style={styles.detail}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "bold",
                color: COLORS.white,
                marginRight: 20,
              }}
            >
              {product.tenSanPham}
            </Text>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: isFavorite ? COLORS.red : COLORS.white,
              }}
            >
              <Icon
                name="favorite-border"
                size={28}
                style={{
                  color: COLORS.primary,
                }}
                onPress={() => {
                  setIsFavorite(!isFavorite);
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: COLORS.light }}>
              {product.moTa || "Trà sữa được làm từ sữa và trà"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
              }}
            >
              Sizes:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {sizes.map((item, index) => {
                return (
                  <SecondaryButton
                    key={index}
                    title={item}
                    btnContainerStyle={{
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 5,
                      marginLeft: 30,
                      backgroundColor:
                        selectedSize === index ? COLORS.red : COLORS.white,
                    }}
                    labelStyle={{
                      color:
                        selectedSize === index ? COLORS.white : COLORS.primary,
                    }}
                    onPress={() => setSelectedSize(index)}
                  />
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <StepperInput
              value={qty}
              onAdd={() => {
                setQty(qty + 1);
              }}
              onMinus={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}
            />
            <View
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                }}
              >
                + {product.giaSanPham * qty}đ
              </Text>
            </View>
          </View>
          <SecondaryButton
            title="Add To Cart"
            btnContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 30,
              backgroundColor: COLORS.white,
              marginVertical: 20,
            }}
            onPress={() => {
              ToastAndroid.show(
                "Thêm sản phẩm thành công",
                ToastAndroid.BOTTOM
              );
              addToCart();
              // navigation.navigate("Home")
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detail: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DetailsScreen;
