import { useRouter } from "next/router"

import OutlinedButton from "@components/ui/OutlinedButton/OutlinedButton";

import services from "@services";

const Room = () => {
    const router = useRouter();

    const leave = async () => {
        const response = await services.roomConnection.leave();
        console.log(response)
        router.push("/");
    }

    const getClients = async () => {
        const response = await services.roomConnection.getUsers();
        console.log(response);
    }

    return (
        <div>
            <OutlinedButton onClick={leave}>
                Leave
            </OutlinedButton>

            <OutlinedButton onClick={getClients}>
                getClients
            </OutlinedButton>
        </div>
    )
}

export default Room;