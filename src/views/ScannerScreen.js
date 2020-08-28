import React, { useState, useEffect } from 'react';
import { Text, View, Vibration, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { withNavigationFocus } from 'react-navigation';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default class ScannerView extends React.Component {

    _focusListener = null;
    _blurListener = null;

    constructor(props){
        super(props);
        this.state = { 
            isFlashOn: false,
            flashState: Camera.Constants.FlashMode.torch,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            scanned: null,
            isFocused: true
        }
    }

    async componentDidMount() {
        //Getting Permission result from app details.
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });

        this._focusListener = this.props.navigation.addListener('focus', () => {
            this.setState({ isFocused: true });
        });

        this._blurListener = this.props.navigation.addListener('blur', () => {
            this.setState({ isFocused: false });
        });
    }

    componentWillUnmount() {
        if (this._focusListener) {
            this._focusListener = null;
        }

        if (this._blurListener) {
            this._blurListener = null;
        }
    }

    changeFlash(){
        this.state.isFlashOn ? 
            this.setState({isFlashOn: false}) : 
            this.setState({isFlashOn: true})
    }

    storeData = async (product) => {
        if (product) {
            try {
                var aHistoryArray;
                var sHistoryArray = await AsyncStorage.getItem('historyArray');
                if (sHistoryArray !== null) {
                    aHistoryArray = JSON.parse(sHistoryArray);
                } else {
                    aHistoryArray = [];
                }

                aHistoryArray.push(product);
                sHistoryArray = JSON.stringify(aHistoryArray);
                
                // Stoquage du produit récupéré dans asyncStorage
                try {
                    await AsyncStorage.setItem(
                        'historyArray',
                        sHistoryArray
                    );
                } catch (error) {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    handleBarCodeScanned = async ({ type, data }) => {

        this.setState({scanned: true})
        Vibration.vibrate();
        

        let product = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.product
            })
            .catch((error) =>{
                console.error(error);
            });

            this.storeData(product);
            this.props.navigation.navigate('Home', {
                screen: 'Details',
                params: { product: product },
            });
	};


    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }
        if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera</Text>
                </View>
            );
        }
        else if (this.state.isFocused) {
        // else {

            return (
            <View style={{ flex: 1 }}>
                <Camera
                    type={Camera.Constants.Type.back}
                    flashMode={this.state.isFlashOn ?  Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}x
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }} 
                
                />
                <Button title={'Flash'} onPress={()=> this.changeFlash()} />
                <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null})} />
                    
              
            </View>
          );
        }
        return null;
    }
}