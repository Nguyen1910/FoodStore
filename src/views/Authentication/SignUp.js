import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthLayout from './AuthLayout'
import COLORS from '../../consts/colors'
import FormInput from '../components/FormInput'
import utils from '../../utils/Ultils'
import Button, {SecondaryButton} from '../components/Button'



const SignUp = ({navigation}) => {

    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showPass, setShowPass] = React.useState("")
    
    const [emailError, setEmailError] = React.useState("")
    const [usernameError, setUsernameError] = React.useState("")
    const [passError, setPassError] = React.useState("")

    function isEnabledSignUp(){
        return email != "" && username != "" && password != "" && emailError == "" && usernameError == "" && passError == "" 
    }

    return (
        <AuthLayout 
            title="Đăng ký"
            subtitle="Tạo một tài khoản để tiếp tục"
            titleContainerStyle={{
                marginTop: 20
            }}
        >
            {/* Form Input and SignUp */}
            <View
                style={{
                    flex: 1,
                    marginTop: 15
                }}
            >
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
                    lable="Username"
                    containerStyle={{
                        marginTop: 15
                    }}
                    onChange={(value) => setUsername(value)}
                    errorMsg={usernameError}
                    appendComponent={
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Icon style={{
                                color: (username == "" || (username != "" && usernameError == "")) ? COLORS.green : COLORS.red,
                            }}
                                name={username == "" || (username != "" && usernameError == "") ? "check-circle-outline" : "warning"}
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
                <View style={{marginTop: 20}}>
                    <Button disabled={isEnabledSignUp() ? false : true} title="Đăng Ký" onPress={() => navigation.navigate("SignIn")}/>
                </View>
            </View>
            
        </AuthLayout>
    );
};

export default SignUp;