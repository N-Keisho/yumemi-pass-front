import { Prefecture } from "@/types/resas";
import styles from "./PrefecturesButtons.module.css";

const checkedColor = {
  0: styles.checked_blue,
  1: styles.checked_red,
  2: styles.checked_yellow,
  3: styles.checked_green,
};

const PrefecturesButtons = ({
  prefectures,
  selectedPrefecture,
  handlePrefChange,
  selectAll,
  reset,
  category,
}: {
  prefectures: Prefecture[];
  selectedPrefecture: Prefecture[];
  handlePrefChange: (prefCode: number) => void;
  selectAll: () => void;
  reset: () => void;
  category: number;
}) => {
  return (
    <div className={styles.back}>
      <SelectAllButton
        selectedPrefecture={selectedPrefecture}
        selectAll={selectAll}
        reset={reset}
        category={category}
      />
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
  const checked = selectedPrefecture.includes(prefecture);
  return (
    <label>
      <div
        className={`${styles.div} ${checked ? checkedColor[category as keyof typeof checkedColor] : ""}`}
      >
        <input
          type="checkbox"
          checked={checked}
          className={styles.checkbox}
          onChange={() => {
            handlePrefChange(prefecture.prefCode);
          }}
        />
        {prefecture.prefName}
      </div>
    </label>
  );
};

const SelectAllButton = ({
  selectedPrefecture,
  selectAll,
  reset,
  category,
}: {
  selectedPrefecture: Prefecture[];
  selectAll: () => void;
  reset: () => void;
  category: number;
}) => {
  const checked = selectedPrefecture.length === 47;

  const handleAllSelect = () => {
    if (selectedPrefecture.length === 47) {
      reset();
    } else {
      selectAll();
    }
  };

  return (
    <label>
      <div
        className={`${styles.div} ${styles.selectAll} ${checked ? checkedColor[category as keyof typeof checkedColor] : ""}`}
      >
        <input
          type="checkbox"
          checked={checked}
          className={styles.checkbox}
          onChange={() => {
            handleAllSelect();
          }}
        />
        全選択
      </div>
    </label>
  );
};
