import UserLayout from "@components/layouts/UserLayout/UserLayout";

import { 
    Room, 
    ConnectionLayout, 
    RoomLayout,
} from "@features/room";

export default function Page() {
    return <Room />
}

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>
            <ConnectionLayout>
                <RoomLayout>
                    {page}
                </RoomLayout>
            </ConnectionLayout> 
        </UserLayout>
    )
}