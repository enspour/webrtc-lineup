import AuthServiceAPI from "core/services-communications/api/AuthService.api";

const accessToken = {
    publicKey: "",
}

const loadPublicKeyAccessJWT = async () => {
    const response = await AuthServiceAPI.loadPublicKeyAccessToken();
    
    if (response.status === 200) {
        const data = await response.json();
        accessToken.publicKey = data.body.key;
    }
}

export {
    loadPublicKeyAccessJWT,
    accessToken
}
