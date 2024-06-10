import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import Chart, { registerables } from 'chart.js/auto';
import styles from './styles.module.scss';
Chart.register(...registerables);


interface ProductProps {
    id: string;
    name: string;
    price: string; 
}

interface ItemProps {
    id: string;
    amount: number;
    observation?: string;
    product: ProductProps;
}

interface OrderProps {
    id: string;
    table: number;
    status: boolean;
    items: ItemProps[];
    created_at: string;
}

export default function dayResults({ orders }: { orders: OrderProps[] }) {
    
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart<"bar"> | null>(null);
  
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<string>('0.00');


    useEffect(() => {
        if (!chartRef.current) return;

        let totalCount = 0;

        const itemCounts: { [itemName: string]: number } = {};
        orders.forEach((order) => {
            order.items.forEach((item) => {
                const itemName = item.product.name;
                itemCounts[itemName] = (itemCounts[itemName] || 0) + item.amount;
                totalCount += item.amount;
            });
        });
        setTotalItems(totalCount);


        let totalValue = 0;

        orders.forEach((order) => {
            order.items.forEach((item) => {
                totalValue += parseFloat(item.product.price) * item.amount;
            });
        });
        setTotalValue(totalValue.toFixed(2));

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        renderChart(chartRef.current, itemCounts);
    }, [orders]);

    // Função para renderizar o gráfico
    const renderChart = (ctx: HTMLCanvasElement, itemCounts: { [itemName: string]: number }) => {
        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(itemCounts),
                datasets: [{
                    label: 'Quantidade Vendida no Dia',
                    data: Object.values(itemCounts),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <>
            <Head>
                <title>Resultado</title>
            </Head>
            <Header />

            <div className={styles.container}>
                <h1>Gráfico de itens vendidos no dia</h1>
                <div className={styles.chartContainer}>
                    <canvas ref={chartRef} width="100" height="100"></canvas>
                </div>
                <p className={styles.totalItems}>
                    Total de itens vendidos:{" "}
                    <span className={styles.totalItemsValue}>{totalItems}</span>
                </p>
                <p className={styles.totalPrice}>
                    Valor vendido no dia: R${" "}
                    <span className={styles.totalPriceValue}>{totalValue}</span>
                </p>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/order/today');

    return {
        props: {
            orders: response.data
        }
    }
})
