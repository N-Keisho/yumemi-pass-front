'use client'
import { getPrefactures } from "@/libs/resas";
import LineChart from "./component/LineChart";
import { useEffect, useState } from "react";
import { Prefecture } from "@/types/resas";


export default function Home() {

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [prefecture, setPrefecture] = useState<Prefecture>({prefCode: 1, prefName: "北海道"});
  const [category, setCategory] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const res = await getPrefactures();
      if (res) {
        setPrefectures(res.result);
      }
    })();
  }, []);

  const handlePrefChange = () => {
    const p = (prefecture.prefCode + 1) % 47 + 1;
    const name = prefectures.find((pe) => pe.prefCode === p)?.prefName;
    setPrefecture({prefCode: p, prefName: name || "?"});
  };

  const handleCategoryChange = () => {
    const c = (category + 1) % 4;
    setCategory(c);
  }

  return (
    <>
      <LineChart prefName={prefecture.prefName} prefCode={prefecture.prefCode} category={category}/>
      <button onClick={handleCategoryChange}>Change Category</button>
      <button onClick={handlePrefChange}>Change Pref</button>

    </>
  );
}
