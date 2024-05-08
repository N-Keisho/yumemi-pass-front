"use client";
import { getPrefectures } from "@/libs/resas";
import LineChart from "./component/ui/LineChart/LineChart";
import { useEffect, useState } from "react";
import { Prefecture } from "@/types/resas";
import CategoryBar from "./component/ui/CategoryBar/CategoryBar";
import styles from "./page.module.css";
import PrefecturesButtons from "./component/ui/PrefecturesButtons/PrefecturesButtons";
import Lodaing from "./component/ui/Loading/Loading";

export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>(
    []
  );
  const [category, setCategory] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const errorOccurred = () => {
    setErrorMessage(
      "人口データの取得に失敗しました。やり直してください。何度も発生する場合はAPI制限にかかっている可能性がありますので，日付が変わってからお試しください。"
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPrefectures();
        if (res) {
          setPrefectures(res.result);
        } else {
          errorOccurred();
        }
      } catch (error) {
        errorOccurred();
      }
    })();
  }, []);

  if (errorMessage !== "") {
    return (
      <div className={styles.loadingBack}>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (prefectures.length === 0) {
    return (
      <div className={styles.loadingBack}>
        <Lodaing />
      </div>
    );
  }

  const handlePrefChange = (prefCode: number) => {
    if (selectedPrefecture.find((p) => p.prefCode === prefCode)) {
      setSelectedPrefecture(
        selectedPrefecture.filter((p) => p.prefCode !== prefCode)
      );
    } else {
      setSelectedPrefecture([
        ...selectedPrefecture,
        prefectures.find((p) => p.prefCode === prefCode)!,
      ]);
    }
  };

  const handleCategoryChange = (id: number) => {
    setCategory(id);
  };

  const reset = () => {
    setSelectedPrefecture([]);
  };

  const selectAll = () => {
    setSelectedPrefecture(prefectures);
  };

  const bgColor = {
    0: styles.blue,
    1: styles.red,
    2: styles.yellow,
    3: styles.green,
  };

  return (
    <div className={styles.container}>
      <CategoryBar handleCategoryChange={handleCategoryChange} />
      <div
        className={`${styles.back} ${bgColor[category as keyof typeof bgColor]}`}
      >
        <PrefecturesButtons
          prefectures={prefectures}
          selectedPrefecture={selectedPrefecture}
          handlePrefChange={handlePrefChange}
          category={category}
          selectAll={selectAll}
          reset={reset}
        />
        <LineChart
          prefectures={selectedPrefecture}
          category={category}
          errorOccurred={errorOccurred}
        />
        <p>出典：RESAS（地域経済分析システム）</p>
      </div>
    </div>
  );
}
