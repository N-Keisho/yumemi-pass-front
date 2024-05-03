'use client'
import { getPrefactures } from "@/libs/resas";
import LineChart from "./component/LineChart";
import { useEffect, useState } from "react";
import { Prefecture } from "@/types/resas";
import CategoryBar from "./component/ui/CategoryBar/CategoryBar";


export default function Home() {

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>([]);
  const [category, setCategory] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPrefactures();
        if (res) {
          setPrefectures(res.result);
        }
      } catch (error) {
        console.error('Failed to fetch prefectures', error);
      }
    })();
  }, []);

  if (prefectures.length === 0) {
    return <div>Loading...</div>
  }

  const handlePrefChange = (prefCode: number) => {
    if (selectedPrefecture.find((p) => p.prefCode === prefCode)){
      setSelectedPrefecture(selectedPrefecture.filter((p) => p.prefCode !== prefCode));
    } else {
      setSelectedPrefecture([...selectedPrefecture, prefectures.find((p) => p.prefCode === prefCode)!]);
    }
  }

  const handleCategoryChange = (id : number) => {
    console.log('category changed', id);
    setCategory(id);
  }

  const reset = () => {
    setSelectedPrefecture([]);
  }

  const selectAll = () => {
    setSelectedPrefecture(prefectures);
  }

  return (
    <>
      <CategoryBar handleCategoryChange={handleCategoryChange}/>
      <LineChart prefectures={selectedPrefecture} category={category}/>
      {/* <button onClick={handleCategoryChange}>Change Category</button> */}
      <button onClick={reset}>Reset</button>
      <button onClick={selectAll}>Select All</button>
      <div>
        {
          prefectures.map((p) => (
            <label key={p.prefCode} style={{display: 'inline-block', margin: '5px'}}>
              <input type="checkbox" checked={selectedPrefecture.includes(p)} onChange={() => {handlePrefChange(p.prefCode)}}/>{p.prefName}
            </label>
          ))
        }
      </div>
    </>
  );
}
