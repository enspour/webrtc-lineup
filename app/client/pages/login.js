import { 
    Login,
    WelcomeLayout
} from "@features/authorization";

export default function Page() {
    return <Login />
};

Page.getLayout = function getLayout(page) {
    return (
        <WelcomeLayout title="Lineup | Login">
            {page}
        </WelcomeLayout>
    )
}