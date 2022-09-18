import styles from "./Panel.module.scss";

const Panel = ({ children }) => {
    return (
        <div className={styles.panel}>
            { children }
        </div>
    )
}

export default Panel;