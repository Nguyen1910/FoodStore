import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";

const SHIPPING_FEE = 0;

const InfoUserScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        marginTop: 30,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <Icon name="arrow-back-ios" size={28} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Thông tin</Text>
        </View>
      </TouchableOpacity>
      {/* Cart List */}
      {/* <View style={{
                flex: 1,
                marginTop: 30,
            }}>
                <FormInput
                    lable="Email"
                    placeholder="nguyenvana@gmail.com"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    onChange={(value) => {
                        utils.validateEmail(value, setEmailError)
                        setEmail(value)
                    }}
                    errorMsg={emailError}
                    appendComponent={
                        <View style={{
                            justifyContent: 'center',
                        }}>
                            <Icon style={{
                                color: (email == "" || (email != "" && emailError == "")) ? COLORS.green : COLORS.red,
                            }}
                                name={email == "" || (email != "" && emailError == "") ? "check-circle-outline" : "warning"}
                                size= {20}
                            />
                        </View>
                    }
                />
                <FormInput
                    lable="Password"
                    autoCompleteType="password"
                    secureTextEntry={!showPass}
                    containerStyle={{
                        marginTop: 20
                    }}
                    onChange={(value) => {
                        utils.validatePassword(value, setPassError)
                        setPassword(value)
                    }}
                    errorMsg={passError}
                    appendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                            }}
                            onPress={() =>{
                                setShowPass(!showPass)
                            }}
                        >
                            <Icon style={{
                                color: showPass ? COLORS.dark : COLORS.grey,
                            }}
                                name="remove-red-eye"
                                size= {20}
                            />
                        </TouchableOpacity>
                    }
                />
                {/* forgot Password */}
      {/*<View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 25,
                    justifyContent: 'flex-end'
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Text style={{
                            color: COLORS.dark,
                            fontSize: 14, fontWeight: 'bold'
                            }}
                            onPress={() => navigation.navigate("ForgotPassword")}
                        >
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button disabled={isEnabledSignIn() ? false : true} title="Đăng nhập" onPress={() => navigation.navigate("Home")}/>
                <View 
                    style={{
                        flexDirection: 'row',
                        marginTop: 15, 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text 
                        style={{
                            color: COLORS.dark,
                            fontSize: 14,
                            marginRight: 5
                        }}
                    >
                        Bạn chưa có tài khoản?
                    </Text>
                    <SecondaryButton title="Đăng ký" onPress={() => navigation.navigate("SignUp")}/>
                </View>
            </View>*/}
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
});

export default InfoUserScreen;
