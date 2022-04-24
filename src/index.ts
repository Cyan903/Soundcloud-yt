import * as cli from "./utils/cli";

(() => {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "upload":
            cli.uploadVideo(args[1]);
            break;
        case "auth":
        case "clean":
        case "help":
            cli[command]();
            break;
        default:
            cli.help();
            break;
    }
})();
