'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getPopulation } from "@/libs/resas";
import { useEffect } from "react";
import { useState } from "react";
import { Population, ExtendedPopulation, Prefecture } from "@/types/resas";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Legend
);

export default function LineChart ({prefectures, category}:{prefectures:Prefecture[], category: number}) {
    
    const selectedPopulations: ExtendedPopulation[] = [];
    const [populationsData, setPopulationsData] = useState<ExtendedPopulation[]>([]);

    prefectures.forEach(async (p) => {
        const pData = populationsData.find((d) => d.prefCode === p.prefCode);
        if (pData) {
            if (!selectedPopulations.find((d) => d.prefCode === p.prefCode))
                selectedPopulations.push(pData);
        }else {
            const res = await getPopulation(p.prefCode);
            if (res) {
                setPopulationsData([...populationsData, {prefCode: p.prefCode, prefName:p.prefName, result: res.result, message: res.message}]);
                selectedPopulations.push({prefCode: p.prefCode, prefName:p.prefName, result: res.result, message: res.message});
            }
        }
    });


    const title = {
        0: "総人口",
        1: "年少人口",
        2: "生産年齢人口",
        3: "老年人口",
    }
    const options: ChartOptions<"line"> = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "年度（年）",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "人口（人）",
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: title[category as keyof typeof title] || "",
            },
            legend: {
                display: true,
                position: "bottom",
            },
        },
        animation: {
            duration: 1000,
        }
    };
    


    const data: ChartData<"line"> = {
        labels: selectedPopulations[0]?.result.data[0].data.map((d) => d.year) || [],
        datasets: selectedPopulations.map((p, i) => {
            return {
                label: p.prefName,
                data: p.result.data[category].data.map((d) => d.value),
                fill: false,
                borderColor: `hsl(${(360 / selectedPopulations.length) * i}, 100%, 50%)`,
            };
        })
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
}