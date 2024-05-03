import { Prefecture } from "@/types/resas";
import styles from "./PrefecturesButtons.module.css";

const PrefecturesButtons = ({
  prefectures,
  selectedPrefecture,
  handlePrefChange,
  category,
}: {
  prefectures: Prefecture[];
  selectedPrefecture: Prefecture[];
  handlePrefChange: (prefCode: number) => void;
  category: number;
}) => {
  return (
    <div className={styles.back}>
      {prefectures.map((p) => (
        <PrefectureButton
          key={p.prefCode}
          prefecture={p}
          selectedPrefecture={selectedPrefecture}
          handlePrefChange={handlePrefChange}
          category={category}
        />
      ))}
    </div>
  );
};
export default PrefecturesButtons;


const PrefectureButton = ({
  prefecture,
  selectedPrefecture,
  handlePrefChange,
  category,
}: {
  prefecture: Prefecture;
  selectedPrefecture: Prefecture[];
  handlePrefChange: (prefCode: number) => void;
  category: number;
}) => {

  const checkedColor = {
    0: styles.checked_blue,
    1: styles.checked_red,
    2: styles.checked_yellow,
    3: styles.checked_green,
  };

  const checked = selectedPrefecture.includes(prefecture);
  return (
    <label className={`${styles.label} ${checked ? checkedColor[category as keyof typeof checkedColor] : '' }`}>
      <input
        type="checkbox"
        checked={checked}
        className={styles.checkbox}
        onChange={() => {
          handlePrefChange(prefecture.prefCode);
        }}
      />
      {prefecture.prefName}
    </label>
  );
};
