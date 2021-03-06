import { Secrets, OAuth, Video } from "../types/auth";
import { AuthClient, VideoService, resData } from "../types/youtube";
import { writeFileSync, createReadStream, readFileSync } from "fs";
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

export function genAuth(authPath: string, secretPath: string) {
    const secret = loadSecret(secretPath);
    const client = new OAuth2(
        secret.installed.client_id,
        secret.installed.client_secret,
        secret.installed.redirect_uris[0]
    ) as AuthClient;

    const url = client.generateAuthUrl({
        access_type: "offline",
        scope: API_SCOPE,
    });

    // Start webserver for Google API
    // prettier-ignore
    spawn("node", ["./dist/api/server.js", secret.installed.redirect_uris[0]], {
        stdio: ["ignore"],
        detached: true,
    }).unref();

    // Prompt
    consola.info("Visit this website. After logging in, paste the code here.");
    consola.info(url);

    client.getToken(
        readlineSync.question("\n\nCode: "),
        (err: Error, token: OAuth) => {
            if (err) {
                consola.info(
                    "Error while trying to retrieve access token",
                    err
                );
                return;
            }

            consola.info("Saved auth data to", authPath);
            writeFileSync(authPath, JSON.stringify(token));

            client.credentials = token;
        }
    );
}

export function loadAuth(authPath: string, secretPath: string) {
    const secret = loadSecret(secretPath);
    const client = new OAuth2(
        secret.installed.client_id,
        secret.installed.client_secret,
        secret.installed.redirect_uris[0]
    ) as AuthClient;

    client.credentials = JSON.parse(
        readFileSync(authPath, {
            encoding: "utf8",
        })
    );

    consola.info("[youtube] loaded auth")
    return client;
}

function loadSecret(path: string): Secrets {
    return JSON.parse(
        readFileSync(path, {
            encoding: "utf-8",
        })
    );
}

export function upload(auth: AuthClient, video: Video) {
    const service: VideoService = google.youtube("v3");

    service.videos.insert(
        {
            auth,
            part: "snippet,status",
            requestBody: {
                snippet: {
                    title: video.title,
                    description: video.description,
                    tags: video.tags,
                    categoryId: CATEGORY.ScienceTechnology,
                    defaultLanguage: "en",
                    defaultAudioLanguage: "en",
                },
                status: {
                    privacyStatus: "private",
                },
            },
            media: {
                body: createReadStream(video.vid),
            },
        },
        (err: Error, response: resData) => {
            if (err) {
                consola.error("API Error:", err);
                return;
            }

            consola.info("[youtube] uploaded video, doing thumbnail...");

            service.thumbnails.set(
                {
                    auth: auth,
                    videoId: response.data.id,
                    media: {
                        body: createReadStream(video.thumb),
                    },
                },
                (err: Error, response: resData) => {
                    if (err) {
                        consola.error("API Error:", err);
                        return;
                    }
                    consola.info(response.data);
                }
            );
        }
    );
}
