'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getPopulation } from "@/libs/resas";
import { useEffect } from "react";
import { useState } from "react";
import { Population } from "@/types/resas";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);


export default function LineChart ({prefName, prefCode, category}:{prefName:string, prefCode: number, category: number}) {
    
    const [population, setPopulation] = useState<Population | null>(null);
    useEffect(() => {
        (async () => {
            const res = await getPopulation(prefCode);
            setPopulation(res);
        })();
    }, [prefCode]);

    if (!population) {
        return <div>loading...</div>;
    }

    const options: ChartOptions<"line"> = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Year",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Population",
                },
            },
        },
    };

    const data: ChartData<"line"> = {
        labels: population.result.data[category].data.map((d) => d.year),
        datasets: [
            {
                label: "Population",
                data: population.result.data[category].data.map((d) => d.value),
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    return (
        <div style={{margin:"10px 0 0 0", padding:"10px"}}>
            <h1>{prefName} の {population.result.data[category].label}</h1>
            <Line options={options} data={data} />
        </div>
    );
}