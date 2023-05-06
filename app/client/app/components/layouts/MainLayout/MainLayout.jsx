import { memo } from "react";

import ContextMenu from "@components/ui/ContextMenu/ContextMenu";

import useServices from "@hooks/useServices";

import { Notifications } from "@features/notifications";

const MainLayout = ({ children }) => {
    useServices();

    return (
        <>
            { children }

            <ContextMenu />
            <Notifications />
        </>
    )
}

export default memo(MainLayout);