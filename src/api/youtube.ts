import { Secrets, OAuth } from "../types/auth";
import { writeFileSync } from "fs";
import { google } from "googleapis";
import { spawn } from "child_process";
import readlineSync from "readline-sync";
import consola from "consola";

const OAuth2 = google.auth.OAuth2;
const API_SCOPE = ["https://www.googleapis.com/auth/youtube.upload"];
const CATEGORY = {
    Entertainment: 24,
    Education: 27,
    ScienceTechnology: 28,
};

export function genAuth(path: string, secrets: Secrets) {
    const client: any = new OAuth2(
        secrets.installed.client_id,
        secrets.installed.client_secret,
        secrets.installed.redirect_uris[0]
    );

    const url = client.generateAuthUrl({
        access_type: "offline",
        scope: API_SCOPE,
    });

    // Start webserver for Google API
    // prettier-ignore
    spawn("node", ["./dist/api/server.js", secrets.installed.redirect_uris[0]],
        {
            stdio: ["ignore"],
            detached: true,
        }
    ).unref();

    // Prompt
    consola.info("Visit this website. After logging in, paste the code here.");
    consola.info(url);

    client.getToken(
        readlineSync.question("\n\nCode: "),
        (err: Error, token: OAuth) => {
            if (err) {
                console.log("Error while trying to retrieve access token", err);
                return;
            }
                        
            consola.info("Saved auth data to", path);
            writeFileSync(path, JSON.stringify(token));

            client.credentials = token;
        }
    );
}
