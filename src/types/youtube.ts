import { OAuth } from "./auth";
import { VideoResponse } from "./res";

// Types not provided by the API :/
type err = (err: Error, response: resData) => void;

export type resData = {
    data: VideoResponse;
};

export interface AuthClient {
    generateAuthUrl: (options: {
        access_type: string;
        scope: string[];
    }) => void;

    getToken: (code: string, fn: (err: Error, token: OAuth) => void) => void;
    credentials: OAuth;
}

export interface VideoService {
    videos: { insert: (o: object, fn: err) => void; };
    thumbnails: { set: (o: object, fn: err) => void };
}
