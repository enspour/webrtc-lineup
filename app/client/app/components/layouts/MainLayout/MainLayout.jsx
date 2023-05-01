import ContextMenu from "@components/ui/ContextMenu/ContextMenu";

import { NotificationsList } from "@features/notifications";

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