'use client'
import { getPrefactures } from "@/libs/resas";
import LineChart from "./component/LineChart";
import { useEffect, useState } from "react";
import { Prefecture } from "@/types/resas";


export default function Home() {

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<number[]>([]);
  const [category, setCategory] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const res = await getPrefactures();
      if (res) {
        setPrefectures(res.result);
      }
    })();
  }, []);

  const handlePrefChange = (prefCode: number) => {
    if (selectedPrefecture.includes(prefCode)) {
      setSelectedPrefecture(selectedPrefecture.filter((p) => p !== prefCode));
    } else {
      setSelectedPrefecture([...selectedPrefecture, prefCode]);
    }
  }

  const handleCategoryChange = () => {
    const c = (category + 1) % 4;
    setCategory(c);
  }

  return (
    <>
      <LineChart prefCode={2} category={category}/>
      <button onClick={handleCategoryChange}>Change Category</button>
      <div style={{}}>
        {
          prefectures.map((p) => (
            <div key={p.prefCode} style={{display: 'inline-block', margin: '5px'}}>
              <input type="checkbox" checked={selectedPrefecture.includes(p.prefCode)} onClick={() => {handlePrefChange(p.prefCode)}}/>{p.prefName}
            </div>
          ))
        }
      </div>
    </>
  );
}
