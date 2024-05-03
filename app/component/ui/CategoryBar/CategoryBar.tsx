import styles from './CategoryBar.module.css';

const CategoryBar = ({handleCategoryChange}: {handleCategoryChange : (id: number) => void}) => {
    return (
        <div className={styles.categoryBar}>
            <CategoryTag categoryName="総人口" className={styles.categoryTag_blue} handleCategoryChange={handleCategoryChange} id={0} />
            <CategoryTag categoryName="年少人口" className={styles.categoryTag_red} handleCategoryChange={handleCategoryChange} id={1} />
            <CategoryTag categoryName="生産年齢人口" className={styles.categoryTag_yellow} handleCategoryChange={handleCategoryChange} id={2} />
            <CategoryTag categoryName="老年人口" className={styles.categoryTag_green} handleCategoryChange={handleCategoryChange} id={3} />
        </div>
    );
};

export default CategoryBar;

const CategoryTag = ({ categoryName, className, handleCategoryChange, id }: { categoryName : string, className:string, handleCategoryChange:(id: number) => void, id:number }) => {
    return (
        <button className={`${styles.categoryTag} ${className}`} onClick={()=>{handleCategoryChange(id)}}>
            <span className={styles.span}>{categoryName}</span>
        </button>
    );
};