import * as React from 'react';
import {Button, Text, View,TextInput, ActivityIndicator, StyleSheet,} from 'react-native';
import firebase from "firebase";


const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
});

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    // Denne fremvser at vi loader. Når en operation idrifsættes skal der vises et load ikon
    startLoading = () => this.setState({ isLoading: true });

    // Vores loading er færdig skal denne metode kaldes til at fjerne load ikonet
    endLoading = () => this.setState({ isLoading: false });

    // Denne vises når vi skal vise en fejlbesked
    setError = errorMessage => this.setState({ errorMessage });

    // Denne klades når vi afprøver en operation igen og skal fjerne fejlbeskeden
    clearError = () => this.setState({ errorMessage: null });

    // Står for at opdatere værdierne af vores input fields når der bliver skrevet i disse
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();

            const result = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
            console.log(result);

            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };

    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now signed up</Text>;
        }
        return (
            <View>
                <Text style = {styles.header}>Login</Text>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.inputField}
                />
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                {this.renderButton()}
            </View>
        );
    };

    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Login" />;
    };
}