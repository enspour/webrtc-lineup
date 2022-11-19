import { observer } from "mobx-react-lite";

import LobbyLayout from "@components/layouts/LobbyLayout/LobbyLayout";

import IslandScreen from "@components/screens/island/IslandScreen/IslandScreen";

import services from "@services";

const Home = observer(() => {
    const current = services.island.Current;

    return (
        <LobbyLayout title={`Lineup | ${current.name}`}> 
            <IslandScreen />
        </LobbyLayout>
    );
})

export default Home;