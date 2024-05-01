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


interface PopulationsDataProps {
    prefCodes: number[];
    populations: Population[];
}

export default function LineChart ({prefCode, category}:{prefCode: number[], category: number}) {
    
    const [selectedPopulations, setSelectedPopulations] = useState<Population[]>([]);
    const [populationsData, setPopulationsData] = useState<PopulationsDataProps>({prefCodes: [], populations: []});
    useEffect(() => {
        setSelectedPopulations([]);
        prefCode.forEach(async (p) => {

            const t = populationsData.prefCodes.find((d) => d === p);
            if (t) {
                // if (selectedPopulations.includes(populationsData.populations[populationsData.prefCodes.indexOf(p)])) return;
                setSelectedPopulations([...selectedPopulations, populationsData.populations[populationsData.prefCodes.indexOf(p)]]);
            }else {
                const res = await getPopulation(p);
                if (res) {
                    setPopulationsData({prefCodes: [...populationsData.prefCodes, p], populations: [...populationsData.populations, res]});
                    setSelectedPopulations([...selectedPopulations, res]);
                }
            }
        });
    }, [prefCode]);

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
        labels: selectedPopulations[0]?.result.data[0].data.map((d) => d.year) || [],
        datasets: selectedPopulations.map((p, i) => {
            return {
                label: p.result.data[0].label,
                data: p.result.data[category].data.map((d) => d.value),
                fill: false,
                borderColor: `hsl(${(360 / selectedPopulations.length) * i}, 100%, 50%)`,
            };
        })
    };

    return (
        <div style={{margin:"10px 0 0 0", padding:"10px"}}>
            <Line options={options} data={data} />
        </div>
    );
}