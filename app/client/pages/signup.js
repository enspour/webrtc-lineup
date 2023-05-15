import {
    Signup,
    WelcomeLayout,
} from "@features/authorization";

export default function Page() {
    return <Signup />
};

Page.getLayout = function getLayout(page) {
    return (
        <WelcomeLayout title="Lineup | Зарегистрироваться">
            {page}
        </WelcomeLayout>
    )
}