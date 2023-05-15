import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";
import UserLayout from "@components/layouts/UserLayout/UserLayout";

import { Island, IslandContent } from "@features/island";

import styles from "@styles/pages/index.module.scss"

export default function Page() {
    return (
        <div>
            <div className={styles.island}>
                <Island />
            </div>

            <IslandContent />
        </div>
    );
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>
            <LobbyLayout title="Lineup | Домашняя страница">
                {page}
            </LobbyLayout>
        </UserLayout>
    )
}