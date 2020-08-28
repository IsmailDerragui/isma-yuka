import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements'

//Exemple avec une class

export default class DetailsScreen extends React.Component{
    render(){

        var ingredient = "";
        this.props.route.params.product.ingredients.map((item, index) => {
            if (index + 1 === this.props.route.params.product.ingredients.length) {
                ingredient = ingredient + item.text + '.';
            } else {
                ingredient = ingredient + item.text + ', ';
            }
        })

        return (
            <ScrollView style={{ flex: 1}}>
                <Image 
                    source={{uri: this.props.route.params.product.image_small_url }}
                    style={{ width: 365, height: 250}}
                />
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.label}>Product name :</Text>
                        <Text style={styles.data}>{this.props.route.params.product.product_name} - {this.props.route.params.product.brands_tags}</Text>
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.label}>Pays :</Text>
                        <Text style={styles.data}>{this.props.route.params.product.countries}</Text>
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.label}>Description :</Text>
                        <Text style={styles.data}>{this.props.route.params.product.generic_name_fr}</Text>
                    </View>
                    <View style={styles.marginTop}>
                        <Text style={styles.label}>Ingrédient :</Text>
                        <Text style={styles.data}>{ingredient}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 20
    },
    marginTop: {
        marginTop: 20
    },
    label: {
        fontWeight: 'bold',
    },
    data: {
        fontSize: 15
    }
});


//Exemple avec une fonction
// export default function DetailsScreen ({route}){
//     return (
        
//         <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>

//             <Image 
//                 source={{uri: route.params.product.image_small_url }}
//                 style={{ width: 365, height: 150}}
//             />

//             <Text>{route.params.product.product_name}</Text>
//             <Text>{route.params.product.brands_tags}</Text>
//             <Text>{route.params.product.countries}</Text>
//         </View>
//     );
// }