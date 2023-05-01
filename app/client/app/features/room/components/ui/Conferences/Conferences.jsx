import { observer } from "mobx-react-lite";

import ConferenceCard from "../ConferenceCard/ConferenceCard";

import services from "@services";

import styles from "./Conferences.module.scss";

const Conferences = observer(() => {
    const conferences = services.room.Conferences.Array;

    return (
        <div className={styles.conferences}>
            { conferences.map(item => <ConferenceCard key={item.id} conference={item}/>) }
        </div>
    )
});

export default Conferences;