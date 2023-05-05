import React from "react";
import { observer } from "mobx-react-lite";

import services from "@services";

import styles from "./Themes.module.scss";

const ThemeItem = ({ active, theme }) => {
    return (
        <div 
            className={styles.themes__item} 
            onClick={() => services.user.Settings.Themes.set(theme)}
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
                className={styles.themes__item__secondary} 
                style={{ borderBottom: `6rem solid ${theme.secondary}` }}
            />
        </div>
    )
}

const ThemesItems = observer(() => {
    const theme = services.user.Settings.Themes.CurrentTheme;

    return (
        <div className={styles.themes__items}>
            {   
                services.user.Settings.Themes.Available.map(item => 
                    <ThemeItem
                        key={item.id} 
                        active={theme.id === item.id} 
                        theme={item} 
                    />
                ) 
            }
        </div>
    )
})

const Themes = () => {
    return (
        <div className={styles.themes}>
            <div className="w-100">
                <div className="text-primary">Theme</div>
                <div className="text-placeholder">
                    Choose a theme that interests you.
                </div>
            </div>

            <ThemesItems />
        </div>
    )
}

export default React.memo(Themes);