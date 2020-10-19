import * as React from 'react';
import {Text, View, StyleSheet, Linking, Button} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';


export default class App extends React.Component {


    cameraRef = React.createRef();

    state = {
        hasCameraPermission: null,
        isClicked: false,
        cameraPosition: Camera.Constants.Type.back,
    };

    componentDidMount() {
        this.updateCameraPermission();
        this.updateNavigation();


    }

    updateNavigation = async () => {
        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
    }


    updateCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    };





    handleTakePhoto = async () => {
        if (!this.cameraRef.current) {
            return;
        }
        const result = await this.cameraRef.current.takePictureAsync();
        //this.props.navigation.navigate(PHOTO_PREVIEW,{lastPhoto: result.uri})
        this.setState({lastPhoto: result.uri});
        this.handleSaveToCameraRoll(this.state.lastPhoto)
    };



    handleSaveToCameraRoll = async uri => {
        try {
            await MediaLibrary.createAssetAsync(uri, 'photo');

        } catch (error) {
            console.error(error);
        }
    };

    // Sørger for at navigere brugeren til indstillinger for at tænde for kameraet
    handleSettingLink = () => {
        Linking.openSettings()
    };




    renderCameraView() {
        const {hasCameraPermission, type} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        }
        if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera.</Text>
                    <Button onPress={this.handleSettingLink} title='Get permissions to access camera'> </Button>
                </View>
            );
        }
        return (
            <View>
                <Camera
                    style={styles.cameraView}
                    type={this.state.cameraPosition}
                    ref={this.cameraRef}>
                </Camera>
                <Button style={styles.btn} title="Press to take photo" onPress={this.handleTakePhoto}/>
            </View>
        );
    }



    render() {
        const {hasCameraPermission, focusedScreen} = this.state;
        if (hasCameraPermission === null) {
            return <View/>
        } else if (hasCameraPermission === false) {
            return <Text>No Access to camera</Text>
        } else if (focusedScreen) {
            return (

                <View style={styles.cameraContainer}>
                    <Text style={styles.textContainer}>Husk jo bedre billede, desto større interesse</Text>
                    {this.renderCameraView()}
                </View>
            )
        } else {
            return <View/>
        }
    }
}

/*
 --------------------------------------- STYLING -------------------------------------------
  */

const containerStyle = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    textContainer: {
        fontSize: 20,
        marginTop: 50,
        marginBottom: 20,
        textAlign: 'center',


    },
    btn: {
        margin: 100
    },
    Flatlist_render: {
        width: '100%'
    },
    cameraContainer: {
        // Her pakkes fælles style ud
        ...containerStyle,
        backgroundColor: '#FFFFFF',
    },

    cameraView2: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '80%',
        backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.2)',
        alignItems: 'center',
        justifyContent: 'space-around',
        aspectRatio: 1.0,

    },
    cameraView: {
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 5,
        width: '100%',
        height: '80%',

    },
    lastPhotoContainer: {
        backgroundColor: '#DFF',
        width: '100%',
        height: 130,
        margin: 0
    },
    galleryContainer: {
        ...containerStyle,
        backgroundColor: '#FDF',
        marginBottom: 100
    },
    thumbnail: {
        width: 110,
        height: 110,
        marginLeft: 140
    }, thumbnail2: {
        width: 200,
        height: 200,
        margin: 10,
    },
    FlatList_image: {
        width: 200,
        height: 200,
        margin: 5
    },
    galleryView: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
    },

});