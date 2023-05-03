import ContextMenu from "@components/ui/ContextMenu/ContextMenu";

import { Notifications } from "@features/notifications";

const MainLayout = ({ children }) => {
    return (
        <>
            { children }

            <ContextMenu />
            <Notifications />
        </>
    )
}

export default MainLayout;