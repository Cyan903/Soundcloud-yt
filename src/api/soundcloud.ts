import scdl from "soundcloud-downloader";
import https from "https";
import { Transform } from "stream";
import { createWriteStream, writeFileSync } from "fs";

export async function downloadSong(url: string, downloadPath: string) {
    const data = await scdl.getInfo(url);

    downloadImage(data.artwork_url, downloadPath);
    scdl.download(url).then((stream) =>
        stream.pipe(createWriteStream(downloadPath + "/audio.mp3"))
    );

    return {
        url,
        artist: data.user.username,
        link: data.user.permalink_url,
        title: data.title,
        description: data.description,
        release: data.created_at,
    }
}

function downloadImage(url: string, downloadPath: string) {
    if (url == "") return;

    // prettier-ignore
    https.request(url, (res) => {
        const data = new Transform();

        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => writeFileSync(downloadPath + "/thumb.jpg", data.read()));
    }).end();
}
