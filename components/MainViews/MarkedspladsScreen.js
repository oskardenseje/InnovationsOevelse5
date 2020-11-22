import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class MarkedspladsScreen extends React.Component {



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Gennemsøg markedspladsen, for tøj der fanger din interesse!</Text>

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