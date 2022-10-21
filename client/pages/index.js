import { observer } from "mobx-react-lite";

import MainLayout from "@components/layouts/MainLayout/MainLayout";

import IslandScreen from "@components/screens/island/IslandScreen/IslandScreen";

import services from "@services";

const Home = observer(() => {
    const current = services.island.Current;

    return (
        <MainLayout title={`Lineup | ${current.name}`}> 
            <IslandScreen />
        </MainLayout>
    );
})

export default Home;