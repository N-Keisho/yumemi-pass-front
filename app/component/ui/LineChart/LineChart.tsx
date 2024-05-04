"use client";

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
import { ExtendedPopulation, Prefecture } from "@/types/resas";
import styles from "./LineChart.module.css";
import Lodaing from "../Loading/Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

export default function LineChart({
  prefectures,
  category,
}: {
  prefectures: Prefecture[];
  category: number;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPopulations, setSelectedPopulations] = useState<
    ExtendedPopulation[]
  >([]);
  const [populationsData, setPopulationsData] = useState<ExtendedPopulation[]>(
    []
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let newPopulationsData: ExtendedPopulation[] = [...populationsData];
      let newSelectedPopulations: ExtendedPopulation[] = [];

      const promises = prefectures.map(async (p) => {
        try {
          const pData = newPopulationsData.find(
            (d) => d.prefCode === p.prefCode
          );
          if (pData) {
            if (!newSelectedPopulations.find((d) => d.prefCode === p.prefCode))
              newSelectedPopulations.push(pData);
            return;
          } else {
            const res = await getPopulation(p.prefCode);
            if (res) {
              const newData = {
                prefCode: p.prefCode,
                prefName: p.prefName,
                result: res.result,
                message: res.message,
              };
              newPopulationsData = [...newPopulationsData, newData];
              newSelectedPopulations = [...newSelectedPopulations, newData];
            }
          }
        } catch (error) {
          console.error(
            `Failed to fetch population data for prefecture code: ${p.prefCode}`,
            error
          );
        }
      });

      await Promise.all(promises);

      if (
        JSON.stringify(newPopulationsData) !== JSON.stringify(populationsData)
      ) {
        setPopulationsData(newPopulationsData);
      }
      setSelectedPopulations(newSelectedPopulations);
      setIsLoading(false);
    })();
  }, [prefectures, populationsData]);

  if (isLoading) {
    return (<div className={styles.back}>
      <Lodaing />
    </div>);
  }

  const title = {
    0: "総人口",
    1: "年少人口",
    2: "生産年齢人口",
    3: "老年人口",
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        title: {
          display: true,
          text: "年度（年）",
          font: { size: 15 },
          color: "#000",
        },
      },
      y: {
        title: {
          display: true,
          text: "人口数（人）",
          font: { size: 15 },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: title[category as keyof typeof title] || "",
        padding: { top: 10, bottom: 10 },
        font: { size: 20},
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
    animation: {
      duration: 1000,
    },
    maintainAspectRatio: false,
  };

  const data: ChartData<"line"> = {
    labels:
      selectedPopulations[0]?.result.data[0].data.map((d) => d.year) || [],
    datasets: selectedPopulations.map((p, i) => {
      return {
        label: p.prefName,
        data: p.result.data[category].data.map((d) => d.value),
        fill: false,
        borderColor: `hsl(${(360 / selectedPopulations.length) * i}, 100%, 50%)`,
      };
    }),
  };

  return (
    <div className={styles.back}>
        <Line options={options} data={data} />
    </div>
  );
}
