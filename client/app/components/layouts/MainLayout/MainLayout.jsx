import ContextMenu from "@components/ui/ContextMenu/ContextMenu";

const MainLayout = ({ children }) => {
    return (
        <>
            { children }

            <ContextMenu />
        </>
    )
}

export default MainLayout;