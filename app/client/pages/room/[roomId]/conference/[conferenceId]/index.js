import UserLayout from "@components/layouts/UserLayout/UserLayout"

import { 
    Conference,
    ConnectionLayout,
    ConferenceLayout,
} from "@features/conference"

export default function Page() {
    return <Conference />
};

Page.getLayout = function getLayout(page) {
    return (
        <UserLayout>
            <ConnectionLayout>
                <ConferenceLayout>
                    {page}
                </ConferenceLayout>
            </ConnectionLayout> 
        </UserLayout>
    )
}