import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';
import firebase from 'firebase';



export default class ProfilScreen extends React.Component {
    handleLogOut = async () => {
        await firebase.auth().signOut();
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>En oversigt over de oplysninger, du har angivet til os</Text>
                <Image style={styles.logo} source={{uri:"https://www.givefoto.dk/media/1338/jesper_august2018-1-of-1.jpg?mode=max&width=356&rnd=131787609160000000"}}/>
                <Text>Opdater email</Text>
                <TextInput style={styles.inputField} placeholder="Email"></TextInput>
                <Button title="Opdater email"/>
                <Text>Opdater adgangskode</Text>
                <TextInput style={styles.inputField} placeholder="Adgangskode"></TextInput>
                <Button title="Opdater adgangskode"/>

                <Button onPress={this.handleLogOut} title="Log out" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
    },
    logo: {
        width: 150,
        height: 130,
        margin: 10,
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    }
});