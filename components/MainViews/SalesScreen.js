import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default class SalesScreen extends React.Component {



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Lav et salgsopslag her!</Text>
                <Text style={styles.brødtekst}>Når du sætter dit tøj til salg kræves der følgende:</Text>
                <Text>1. Du bedes tage et billede af det pågældende stykke tøj. Dette SKAL ske gennem Second Hand app'en for din og købers sikkerhed.</Text>
                <Text>2. Du bedes angive størrelsen på tøjet.</Text>
                <Text>3. Du bedes vurderer den stand dit stykke tøj befinder sig på en skala fra 1-10 </Text>
            </View>
        );
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
});
