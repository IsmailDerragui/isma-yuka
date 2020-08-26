import React from 'react';
import { ActivityIndicator, SafeAreaView, AsyncStorage, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HistoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    // Dès que le composant est chargé, j'alimente le state avec des données
    componentDidMount() {
        this.retrieveData();
    }

    retrieveData = async () => {
        try {
            var sHistoryArray = await AsyncStorage.getItem('historyArray');
            this.setState({
                list: JSON.parse(sHistoryArray)
            });
        } catch (error) {
            console.error(error);
        }
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <TouchableOpacity>
            <ListItem
                title={item.product_name}
                leftAvatar={{ source: { uri: item.image_small_url } }}
                bottomDivider
                chevron
                onPress={() => {
                    this.props.navigation.navigate('Details', { product: item })
                    this.props.navigation.navigate('Home', {
                        screen: 'Details',
                        params: { product: item },
                    });
                }}
            />
        </TouchableOpacity>
    );

    render() {

        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.list}
                renderItem={this.renderItem}
            />
        );
    }
}