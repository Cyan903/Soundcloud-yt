import { genAuth } from "./api/youtube";

genAuth("./auth.json", {
    installed: {
        client_id: "",
        client_secret: "",
        redirect_uris: ["http://localhost:8080/oauth2callback"],
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://accounts.google.com/o/oauth2/token",
    },
});
