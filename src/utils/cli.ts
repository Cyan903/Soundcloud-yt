/*
soundcloud-yt upload https://soundcloud.com/momonesakai/cant-be-anything
soundcloud-yt auth
soundcloud-yt clean
soundcloud-yt help
*/
import { genAuth, loadAuth, upload } from "../api/youtube";
import { downloadSong } from "../api/soundcloud";
import { merge } from "./ffmpeg";
import { unlink } from "fs";
import { join } from "path";
import consola from "consola";

export async function uploadVideo(url: string) {
    const auth = loadAuth("./config/auth.json", "./config/secret.json");
    const data = await downloadSong(url, "./res", async () => {
        await merge(
            join(__dirname, "../../res/thumb.jpg"),
            join(__dirname, "../../res/audio.mp3"),
            join(__dirname, "../../res/output.mkv")
        );

        upload(auth, {
            title: `[soundcloud-yt] ${data.artist} - ${data.title}`,
            description: `Uploaded with soundcloud-yt.\nReleased in ${data.release}\n\n${data.description}`,
            tags: [],
            thumb: join(__dirname, "../../res/thumb.jpg"),
            vid: join(__dirname, "../../res/output.mkv"),
        });
    });
}

export function auth() {
    consola.info("[auth] authenticating...");
    genAuth(
        join(__dirname, "../../config/auth.json"),
        join(__dirname, "../../config/secret.json")
    );
}

export function clean() {
    consola.info("[clean] cleanning unused files...");
    const remove = ["audio.mp3", "thumb.jpg", "output.mkv"];

    for (const file of remove) {
        unlink(join(__dirname, "../../res/" + file), (err) => {
            if (err && err.code == "ENOENT") {
                consola.info(`[clean] ${file} doesn't exist, skipping`);
            } else if (err) {
                consola.error(`[clean] could not remove files ${err}`);
            } else {
                consola.info(`removed ${file}`);
            }
        });
    }
}

// export function help() {}
