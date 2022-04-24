import { genAuth, loadAuth, upload } from "./api/youtube";

// Generate Auth
(() => {
    // First argument is auth output
    genAuth("./config/auth.json", "./config/secret.json");
});


// Upload Video
(() => {
    const auth = loadAuth("./config/auth.json", "./config/secret.json");

    upload(auth, {
            title: "Very cool",
            description: "Upload test",
            tags: ["wow"],
            thumb: "./tmp/res/thumb.png",
            vid: "./tmp//res/hehe.mp4",
        }
    );
});
