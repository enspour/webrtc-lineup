import { observer } from "mobx-react-lite";

import ConferenceCard from "../../ui/ConferenceCard/ConferenceCard";

import services from "@services";

import styles from "./Conferences.module.scss";

const Conferences = observer(() => {
    const conferences = services.room.Conferences.Array;

    if (conferences.length === 0) {
        return (
            <div className={styles.conferences__empty}>
                Ваши конференции будут храниться здесь. Создайте вашу первую конференцию.
            </div>
        )
    }

    return (
        <div className={styles.conferences}>
            { conferences.map(item => <ConferenceCard key={item.id} conference={item}/>) }
        </div>
    )
});

export default Conferences;