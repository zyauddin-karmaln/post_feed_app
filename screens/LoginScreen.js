import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import screens from '../Utility';
import {loginAction, updateToken, updateUser} from '../Redux/Actions/appAction';
import {StackActions} from '@react-navigation/native';
import CustomLoader from '../Utility/CustomLoader';
import {getToken, getUser} from '../Utility/storage';
import {setAuthToken} from '../Api/AxiosConfigure';

const LoginScreen = props => {
  const [email, setEmail] = useState('dasdasd@gmail.com');
  const [password, setPassword] = useState('dsfafsdfsd');
  const {isLoading, screen} = useSelector(state => state?.loaderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(userObj => {
      console.log('getting user object:- ', userObj);
      if (!!userObj) {
        getToken(access_token => {
          setAuthToken(access_token);
          dispatch(updateToken(access_token));
        });
        dispatch(updateUser(userObj));
        props?.navigation?.dispatch(StackActions.replace(screens.app));
      }
    });
  }, []);

  const handleLogin = () => {
    const params = {user: {email: email, password: password}};
    dispatch(
      loginAction(params, () => {
        props?.navigation?.dispatch(StackActions.replace(screens.app));
      }),
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      {screen === screens.auth && isLoading ? <CustomLoader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
