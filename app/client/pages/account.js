import UserLayout from "@components/layouts/UserLayout/UserLayout";
import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";

import { Account } from "@features/user";

export default function Page() {
    return <Account />
};

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>
            <LobbyLayout title="Lineup | Аккаунт">
                {page}
            </LobbyLayout>
        </UserLayout>
    )
}