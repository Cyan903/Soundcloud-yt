import { genAuth, loadAuth, upload } from "../api/youtube";
import { downloadSong } from "../api/soundcloud";
import { merge } from "./ffmpeg";
import { unlink } from "fs";
import { join } from "path";
import consola from "consola";

// prettier-ignore
export const help = () => process.stdout.write(
`soundcloud-yt upload https://soundcloud.com/example_artist/example_song
    - Upload a song to YouTube.

soundcloud-yt auth
    - Run authorize process.

soundcloud-yt clean
    - Clean files that haven't been uploaded.

soundcloud-yt help
    - Prints this reference.

`);

export async function uploadVideo(url: string) {
    const auth = loadAuth("./config/auth.json", "./config/secret.json");

    await downloadSong(url, "./res", async (data) => {
        consola.info("[upload] metadata:", data);
        await merge(
            join(__dirname, "../../res/thumb.jpg"),
            join(__dirname, "../../res/audio.mp3"),
            join(__dirname, "../../res/output.mkv")
        );

        upload(auth, {
            title: `[soundcloud-yt] ${data.artist} - ${data.title}`.replace(
                /(.{70})..+/,
                "$1…"
            ),
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
