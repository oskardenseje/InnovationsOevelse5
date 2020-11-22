import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class MessageScreen extends React.Component {



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Dette er en oversigt over dine seneste samtaler!</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:'50%',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        padding: 10,
    },
});