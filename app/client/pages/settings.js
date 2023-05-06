import UserLayout from "@components/layouts/UserLayout/UserLayout";
import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";

import { Settings } from "@features/user";

export default function Page() {
    return <Settings />
};

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>
            <LobbyLayout title="Lineup | Settings">
                {page}
            </LobbyLayout>
        </UserLayout>
    )
}