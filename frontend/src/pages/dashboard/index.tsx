import { useState } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { ModalOrder } from '../../components/ModalOrder'
import Modal from 'react-modal';
import { toast } from 'react-toastify';


type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  observation: string | null;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

export default function Dashboard({ orders }: HomeProps) {

  const [orderList, setOrderList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([])
  const [modalVisible, setModalVisible] = useState(false);


  function handleCloseModal() {
    setModalVisible(false);
  }
 

  //abrir o modal
  async function handleOpenModalView(id: string) {

    const apiClient = setupAPIClient();

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      }
    })

    setModalItem(response.data);
    setModalVisible(true);

  }

  // finalizar pedido
  async function handleFinishItem(id: string) {
    const apiClient = setupAPIClient();
    await apiClient.put('/order/finish', {
      order_id: id,
    })

    toast.success("pedido concluído com sucesso!")

    const response = await apiClient.get('/orders');
    setOrderList(response.data);

    setModalVisible(false)

  }
  
  //atualizar os pedidos na tela
  async function hadleRefreshOrders() {
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/orders')
    if (response.data.length > orderList.length) {
     

      const newOrdersCount = response.data.length - orderList.length;
      toast.success(`Você tem ${newOrdersCount} novo(s) pedido(s)!`);
    }
    setOrderList(response.data);

  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Home - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>

          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button onClick={hadleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOreders}>

            {orderList.length === 0 && (
              <span className={styles.emptylist}>
                Não foi encontrado nenhum pedido aberto
              </span>
            )}
             
           
            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>          
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}

          </article>

        </main>


        {modalVisible && (
          <ModalOrder isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
          />
        )}

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/orders');


  return {
    props: {
      orders: response.data
    }
  }
})