import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default class ListItem extends React.Component{
    
    _onPress(item){

        this.props.navigation.navigate('Details', 
            {
                product: item
            }
        )
        
        /*
        // Variante de navigate si je veux aller dans une autre pile de navigation
        // https://reactnavigation.org/docs/params#passing-params-to-nested-navigators
        this.props.navigation.navigate('Details', {
            screen: 'Details',
            params: { product: item },
        });
        */
    }
    
    render() {
        return (
            <View style={styles.lineContainer}>
                <TouchableOpacity onPress={()=> this._onPress(this.props.item)}>
                    <Text>{this.props.item.product_name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lineContainer: {
      height: 40,
      padding: 10,
    }
});