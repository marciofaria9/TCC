import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupAPIClient } from '../../services/api';
import Chart from 'chart.js/auto';
import styles from './styles.module.scss';

interface OrderData {
    [productName: string]: number;
}

export default function MonthResults({ orders }: { orders: OrderData }) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        if (!chartRef.current || !orders) return;

        const itemCounts: { [itemName: string]: number } = orders;
        let totalCount = 0;

        Object.values(itemCounts).forEach(amount => totalCount += amount);

        setTotalItems(totalCount);

        if (!chartInstanceRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(itemCounts),
                        datasets: [{
                            label: 'Quantidade Vendida no Mês',
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
            }
        } else {
            const chartInstance = chartInstanceRef.current;
            chartInstance.data.labels = Object.keys(itemCounts);
            chartInstance.data.datasets[0].data = Object.values(itemCounts);
            chartInstance.update();
        }
    }, [orders]);

    return (
        <>
            <Head>
                <title>Resultado</title>
            </Head>
            <Header />
            <div className={styles.container}>
                <h1>Gráfico de Pizzas Vendidas no Mês</h1>
                <div className={styles.chartContainer}>
                    <canvas ref={chartRef} width="100" height="100"></canvas>
                </div>
                <p className={styles.totalItems}>
                    Total de Pizzas Vendidas:{" "}
                    <span className={styles.totalItemsValue}>{totalItems}</span>
                </p>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/order/pizza/month');

    return {
        props: {
            orders: response.data || {}
        }
    }
})
