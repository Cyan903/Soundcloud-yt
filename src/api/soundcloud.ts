import scdl from "soundcloud-downloader";
import https from "https";
import consola from "consola";
import { Transform } from "stream";
import { createWriteStream, writeFileSync } from "fs";

type songRes = {
    artist: string,
    link: string,
    title: string,
    description: string ,
    release: string ,
}

export async function downloadSong(url: string, downloadPath: string, callback: (o: songRes) => void) {
    const data = await scdl.getInfo(url);

    await downloadImage(data.artwork_url, downloadPath);
    scdl.download(url).then((stream) => {
        stream.pipe(createWriteStream(downloadPath + "/audio.mp3"));
        stream.on("end", () => {
            consola.info("[soundcloud] downloaded audio");
            callback({
                artist: data.user.username,
                link: data.user.permalink_url,
                title: data.title,
                description: data.description,
                release: data.created_at,
            });
        });
    });
}

function downloadImage(url: string, downloadPath: string) {
    if (!url) {
        consola.warn(`[soundcloud] artwork returned ${url}, using default...`);
        url = "https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/no-thumb.jpg";
    }

    // Higher quality imge (that the API doesn't return)
    // I have yet to find a song which doesn't have this size.
    url = url.replace("-large.jpg", "-t500x500.jpg");

    return new Promise((resolve) => {
        // prettier-ignore
        https.request(url, (res) => {
            const data = new Transform();

            res.on("data", (chunk) => data.push(chunk));
            res.on("end", () => {
                writeFileSync(downloadPath + "/thumb.jpg", data.read());
                consola.info("[soundcloud] downloaded image");
                resolve(null);
            });
        }).end();
    })
}
