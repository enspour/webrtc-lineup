import ContextMenu from "@components/ui/ContextMenu/ContextMenu";

import { NotificationsList } from "@features/Notifications";

const MainLayout = ({ children }) => {
    return (
        <>
            { children }

            <ContextMenu />
            <NotificationsList />
        </>
    )
}

export default MainLayout;