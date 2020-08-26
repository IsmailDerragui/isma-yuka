import React from 'react';
import { ActivityIndicator, SafeAreaView, FlatList } from 'react-native';

// Composant custom pour formatter les lignes de la flatlist
import ListItem from '../components/ListItem'


export default class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        // Etat initial du composant
        this.state = { 
            products: false
        }
    }

    // Dès que le composant est chargé, j'alimente le state avec des données
    componentDidMount(){
        return fetch('https://fr-en.openfoodfacts.org/category/pizzas/1.json')
            .then((response) => response.json())
            .then((responseJson) => {

                // Change l'état du composant
                this.setState({
                    products: responseJson.products,
                });
        
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render(){
        // Affiche un loader tant que l'API n'a pas répondu
        if(!this.state.products){
            return(
                <SafeAreaView style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </SafeAreaView>
            )
        }
        else{
            return(
                <SafeAreaView style={{flex: 1, paddingTop:20}}>
                    <FlatList
                        data={this.state.products}
                        renderItem={({item}) => <ListItem item={item} navigation={this.props.navigation}  />}
                        keyExtractor={({id}, index) => id}
                    />
                </SafeAreaView>
            );
        }

    }
    
}