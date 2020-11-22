import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SignUpForm from './components/Login og Signup/SignUpForm';
import firebase from 'firebase';
import LoginForm from "./components/Login og Signup/LoginForm";
import ProfilScreen from "./components/MainViews/ProfilScreen";
import MarkedspladsScreen from "./components/MainViews/MarkedspladsScreen";
import SalesScreen from "./components/MainViews/SalesScreen";
import MessageScreen from "./components/MainViews/MessageScreen";
// or any pure javascript modules available in npm
import {BottomNavigation, Card} from 'react-native-paper';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from '@expo/vector-icons';
import {createAppContainer} from "react-navigation";
import CameraScreen from "./components/MainViews/CameraScreen";


const TabNavigator = createBottomTabNavigator(
    {
      ProfilScreen: {
        screen: ProfilScreen,
        navigationOptions: {
          tabBarLabel: "Profil",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name="user" size={24} color="black"/>
          )
        },
      },
      MarkedspladsScreen: {
        screen: MarkedspladsScreen,
        navigationOptions: {
          tabBarLabel: "Markedsplads",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name="shoppingcart" size={24} color={tintColor}/>

          )
        },
      },
      SalesScreen: {
        screen: SalesScreen,
        navigationOptions: {
          tabBarLabel: "Sælg",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name="tags" size={24} color="black"/>
          )
        },
      },
      CameraScreen: {
          screen: CameraScreen,
          navigationOptions: {
              tabBarLabel: "Kamera",
              tabBarIcon: ({tintColor}) => (
                  <AntDesign name="camera" size={24} color="black"/>
              )
          }
      },
      MessageScreen: {
          screen: MessageScreen,
          navigationOptions: {
              tabBarLabel: "Indbakke",
              tabBarIcon: ({tintColor}) => (
                  <AntDesign name="message1" size={24} color="black"/>
              )
          }
      }
    },
    {
      tabBarOptions: {
        showIcon: true,
        labelStyle: {
          fontSize: 15,
        },
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        size: 40
      }
    }
)

const AppContainer = createAppContainer(TabNavigator);

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
            <Text style={styles.header}>
              Login på Second Hand Clothing - eller registrer dig nu!
            </Text>
            <Card>
              <LoginForm />
            </Card>
            <Card>
              <SignUpForm />
            </Card>
          </View>
      )
    } else {
      return (
            <AppContainer/>
      )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 50
    },
    header: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
