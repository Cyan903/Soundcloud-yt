import { exec } from "child_process";
import { promisify } from "util";
import consola from "consola";

const execSync = promisify(exec);

export async function merge(img: string, audio: string, output: string) {
    try {
        await execSync(
            `ffmpeg -loop 1 -i ${img} -i ${audio} -shortest -acodec copy -vcodec mjpeg ${output} -y`
        );

        consola.info("[ffmpeg] merged resources");
        return output;
    } catch (e) {
        consola.error(e);
        process.exit(1);
    }
}
