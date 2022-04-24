import { genAuth, loadAuth, upload } from "./api/youtube";
import consola from "consola";

// Generate Auth
() => {
    // First argument is auth output
    genAuth("./config/auth.json", "./config/secret.json");
};

// Upload Video
() => {
    const auth = loadAuth("./config/auth.json", "./config/secret.json");

    upload(auth, {
        title: "Very cool",
        description: "Upload test",
        tags: ["wow"],
        thumb: "./tmp/res/thumb.png",
        vid: "./tmp//res/hehe.mp4",
    });
};

import { downloadSong } from "./api/soundcloud";

(async () => {
    const data = await downloadSong(
        "soooooooooooooooooong",
        "./res"
    );

    consola.info(data);
})();
