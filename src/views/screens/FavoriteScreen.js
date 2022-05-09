import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import favoriteApi from "../../api/favoriteApi";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const FavoriteScreen = ({ navigation, route }) => {
  const [favoritesList, setFavoritesList] = React.useState([]);
  const token = route.params;

  React.useEffect(() => {
    const getFavoritesList = async (favorites) => {
      try {
        const result = await favoriteApi.getFavorite(token);
        setFavoritesList(result);
      } catch (error) {
        console.log(error, "getFavoritesList");
      }
    };
    getFavoritesList();
  }, []);

  const Card = ({ product }) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("DetailsScreen", [product.maSanPham, token])
        }
      >
        <View style={styles.card}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              source={require("../../assets/product.png") || product.anhSanPham}
              style={{ height: 120, width: 120, borderRadius: 10 }}
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 5 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {product.tenSanPham}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.grey }}>
              {product.moTa || "Ngon"}
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {product.giaSanPham}đ
            </Text>
            <View style={styles.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, marginTop: 30 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ưa thích</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        numColumns={2}
        data={favoritesList}
        renderItem={({ item }) => <Card product={item} />}
      ></FlatList>
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
  inputContainer: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  sortBtn: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImg: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 270,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoriteScreen;
