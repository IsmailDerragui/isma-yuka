import React from 'react';
import { Text, View, Image } from 'react-native';
import { Icon, Button } from 'react-native-elements'

//Exemple avec une class
/*
export default class DetailsScreen extends React.Component{

    render(){
        console.log(this.props.route.params.product.image_small_url);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.props.route.params.product.product_name}</Text>
                <Image 
                    source={{uri: this.props.route.params.product.image_small_url }}
                    style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 100 }}
                    />
            </View>
        );
    }
   
}
*/

//Exemple avec une fonction
export default function DetailsScreen ({route}){
    return (
        
        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>

            <Image 
                source={{uri: route.params.product.image_small_url }}
                style={{ width: 365, height: 150}}
            />

            <Text>{route.params.product.product_name}</Text>
            <Text>{route.params.product.brands_tags}</Text>
            <Text>{route.params.product.countries}</Text>
        </View>
    );
}