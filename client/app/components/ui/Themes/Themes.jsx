import useThemes from "@hooks/useThemes";

import styles from "./Themes.module.scss";

const ThemeItem = ({ active, theme, setTheme }) => {
    return (
        <div 
            className={styles.theme} 
            onClick={() => setTheme(theme)}
            style={
                active 
                    ? { border: ".2rem solid var(--theme-border-secondary)" } 
                    : { border: ".2rem solid var(--theme-border-primary)" } 
            }
        >
            <div 
                className={styles.theme__primary} 
                style={{ borderLeft: `6rem solid ${theme.primary}` }}
            />
            <div 
                className={styles.theme__tertiary} 
                style={{ borderBottom: `6rem solid ${theme.tertiary}` }}
            />
        </div>
    )
}


const Themes = () => {
    const [theme, setTheme, themes] = useThemes();

    return (
        <div className={styles.themes}>
            {   
                themes.map(item => 
                    <ThemeItem 
                        key={item.id} 
                        active={theme.id === item.id} 
                        theme={item} 
                        setTheme={setTheme}
                    />
                ) 
            }
        </div>
    )
}

export default Themes;