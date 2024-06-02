import React from 'react';
import {
  View, Text, StyleSheet, Dimensions, ScrollView, Pressable
} from 'react-native'
import { CategoryProps } from '../../pages/Order'


interface ModalPickerProps {
  options: CategoryProps[]; 
  handleCloseModal: () => void; 
  selectedItem: (item: CategoryProps) => void; // Função para lidar com a seleção de um item
}


const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

// Definição do componente ModalPicker
export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

  // Função para lidar com o pressionar de um item
  function onPressItem(item: CategoryProps) {
    selectedItem(item); 
    handleCloseModal(); 
  }

  // Mapeando as opções para renderizar cada uma como um item pressionável
  const option = options.map((item, index) => (
    <Pressable key={index} style={styles.option} onPress={() => onPressItem(item)}>
      <Text style={styles.item}>
        {item?.name} 
      </Text>
    </Pressable>
  ))

  
  return (
    <Pressable style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option} 
        </ScrollView>
      </View>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: WIDTH - 20,
    height: HEIGHT / 2,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 4,
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8a8a8a'
  },
  item: {
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101026'
  }
})
