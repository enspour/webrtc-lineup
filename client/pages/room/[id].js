import { useRouter } from "next/router"

import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

import services from "@services";

const Room = () => {
    const router = useRouter();
    const { id } = router.query;

    const leave = async () => {
        const response = await services.roomConnection.leave(id);
        console.log(response)
        router.push("/");
    }

    return (
        <div>
            <OutlinedButton onClick={leave}>
                Leave
            </OutlinedButton>
        </div>
    )
}

export default Room;