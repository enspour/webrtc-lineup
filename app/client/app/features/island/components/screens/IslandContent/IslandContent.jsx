import { observer } from "mobx-react-lite";

import services from "@services";

const IslandContent = observer(() => {
    const current = services.island.Tabs.Current;

    return (
        <div>
            {current.component}
        </div>
    )
})

export default IslandContent;