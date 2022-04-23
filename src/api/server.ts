import { createServer } from "http";

// https://stackoverflow.com/a/901144
function getParam(name: string, url: string) {
    const results = new RegExp(
        "[?&]" + name.replace(/[[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"
    ).exec(url);

    if (!results) return null;
    if (!results[2]) return "";

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function createTokenServer(port: number, path: string) {
    const http = createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });

        // Needs host but no need to grab the actual host.
        const u = new URL(`http://example.com${req.url}`);

        if (u.pathname != path) {
            res.write("Nothing here...");
            res.end();
            return;
        }

        res.write(getParam("code", req.url));
        res.end();
        http.close();
    }).listen(port);
}

(() => {
    const url = new URL(process.argv[2]);

    createTokenServer(parseInt(url.port), url.pathname);
})();
