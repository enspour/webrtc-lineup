import React from "react";

import useThemes from "@hooks/useThemes";

import styles from "./ThemesScreen.module.scss";

const ThemeItem = ({ active, theme, setTheme }) => {
    return (
        <div 
            className={styles.themes__item} 
            onClick={() => setTheme(theme)}
            style={
                active 
                    ? { border: ".2rem solid var(--theme-border-secondary)" } 
                    : { border: ".2rem solid var(--theme-border-primary)" } 
            }
        >
            <div 
                className={styles.themes__item__primary} 
                style={{ borderLeft: `6rem solid ${theme.primary}` }}
            />
            <div 
                className={styles.themes__item__tertiary} 
                style={{ borderBottom: `6rem solid ${theme.tertiary}` }}
            />
        </div>
    )
}

const Themes = () => {
    const [theme, setTheme, themes] = useThemes();

    return (
        <div className={styles.themes__items}>
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

const ThemesTitle = () => {
    return (
        <div className="w-100">
            <div className="text-primary">Theme</div>
            <div className="text-placeholder">
                Choose a theme that interests you.
            </div>
        </div>
    )
}


const ThemesScreen = () => {
    return (
        <div className={styles.themes}>
            <ThemesTitle />
            <Themes />
        </div>
    )
}

export default React.memo(ThemesScreen);