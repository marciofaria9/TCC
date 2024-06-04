import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Modal } from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';
import { FlatList } from 'react-native'; 7
import { StackPramsList } from '../../routes/app.routes';

type RouteDetailParams = {
    Order: {

        number: string | number;
        order_id: string;
    }

}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export type CategoryProps = {
    id: string;
    name: string;
}

type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
    observation: string;

}

export default function Order() {

    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false);


    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[]>([])
    const [observation, setObservation] = useState('')


    //carregar categorias
    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')

            setCategory(response.data);
            setCategorySelected(response.data[0])

        }

        loadInfo();
    }, [])


    //carregar produtos da categoria
    useEffect(() => {

        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data);
            setProductSelected(response.data[0])

        }

        loadProducts();

    }, [categorySelected])


    //deletar a mesa
    async function handleCloseOrder() {

        try {

            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })

            alert("Mesa excluída com sucesso")
            navigation.goBack()

        } catch (err) {
            console.log(err)
            alert("Erro ao deletar a mesa")

        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }


    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item)
    }


    //adicionar item ao pedido
    async function handleAddItem() {
        const response = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount),
            observation: observation
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount,
            observation: observation

        }

        setItems(oldArray => [...oldArray, data])
        setObservation('')
    }



    //remover items do pedido
    async function handleDeleteItem(item_id: string, item_nome: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        alert(`${item_nome} excluído com sucesso`)

        //revmover da lista de items
        let removeItem = items.filter(item => {
            return (item.id !== item_id) //devolve items diferentes do id que foi passado
        })

        setItems(removeItem)
    }

    //enviar pedido para cozinha
    function handleFinishOrder() {
        navigation.navigate("FinishOrder", {
            number: route.params?.number,
            order_id: route.params?.order_id
        })
    }

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title} >Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <Pressable onPress={handleCloseOrder}>
                        <MaterialCommunityIcons name="delete-outline" size={28} color="#FF3f4b" />
                    </Pressable>
                )}
            </View>

            {category.length !== 0 && (
                <Pressable style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#FFF' }}>
                        {categorySelected?.name}
                    </Text>
                </Pressable>
            )}


            {products.length !== 0 && (
                <Pressable style={styles.input} onPress={() => setModalProductVisible(true)} >
                    <Text style={{ color: '#FFF' }}>
                        {productSelected?.name}
                    </Text>
                </Pressable>
            )}

                <View>
                    <TextInput
                        placeholder="Observação"
                        style={styles.input}
                        placeholderTextColor="#F0F0F0"
                        value={observation}
                        onChangeText={setObservation}
                    />
                </View>


            <View style={styles.qtdContainer} >
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholder="1"
                    placeholderTextColor="#F0F0F0"
                    inputMode="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>


            <View style={styles.actions}>
                <Pressable style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />



            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >

                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />

            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >

                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />

            </Modal>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 14
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})