import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Holdings",
        },
    },
    scales: {
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45,
            },
        },
    },
};

export function VerticalGraph({ data }) {
    const chartData = {
        ...data,
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            barThickness: 40,
            maxBarThickness: 40,
        })),
    };

    return <Bar options={options} data={chartData} />;
}