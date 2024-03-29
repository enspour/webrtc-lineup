import Link from "next/link";
import { observer } from "mobx-react-lite";

import services from "@services";

import styles from "./Header.module.scss";

const Header = observer(() => {
    const id = services.room.Info.Id
    const name = services.room.Info.Name;
    
    return (
        <div className={styles.header}>
            <Link href={`/room/${id}`}>
                <div className={styles.header__title}> {name} </div>
            </Link>
        </div>
    )
})

export default Header;