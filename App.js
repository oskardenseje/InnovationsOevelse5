import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import SignUpForm from './components/SignUpForm';
import firebase from 'firebase';
import LoginForm from "./components/LoginForm";
import ProfilScreen from "./components/ProfilScreen";
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends Component {
  state = {user:null}

  UNSAFE_componentWillMount(){
    const fireBaseConfig ={
      apiKey: "AIzaSyBB7aLOqGsMBTbx-V673ntcw_7NiVWcdfk",
      authDomain: "innovationsoevelse5.firebaseapp.com",
      databaseURL: "https://innovationsoevelse5.firebaseio.com",
      projectId: "innovationsoevelse5",
      storageBucket: "innovationsoevelse5.appspot.com",
      messagingSenderId: "743725151258",
      appId: "1:743725151258:web:b50fa43f8fa38918c0cda3",
      measurementId: "G-1W4VRW8DWD"
    }
    // vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
    if (!firebase.apps.length) {
      firebase.initializeApp(fireBaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  render() {
    const {user} = this.state

    if(!user){
      return (
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              Opret eller Login med din firebase Email
            </Text>
            <Card>
              <SignUpForm />
            </Card>
            <Card>
              <LoginForm />
            </Card>
          </View>
      )
    } else {
      return (

          <ProfilScreen user={user}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});