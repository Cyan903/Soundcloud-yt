# Soundcloud-yt
![package-version](https://img.shields.io/github/package-json/v/cyan903/Soundcloud-yt) ![last-commit](https://img.shields.io/github/last-commit/cyan903/Soundcloud-yt) ![repo-size](https://img.shields.io/github/repo-size/cyan903/Soundcloud-yt)

Soundcloud-yt is a simple cli that will upload [Soundcloud](https://soundcloud.com/) songs to YouTube. Uses [ffmpeg](https://ffmpeg.org/) to render the video. Video uploads are private by default, this is to prevent copyright claims.

![homepage](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/homepage.png)



### Usage
Upload a song:
```sh
$ pnpm start upload https://soundcloud.com/example_artist/example_song
```

```sh
$ pnpm start auth # run authorize process
$ pnpm start clean # cleanup uploaded files
$ pnpm start help # command reference
```


### Why?
Many people including myself use YouTube as their main source for listening to music. However, there is a huge selection of music that only exists on Soundcloud. It gets tiresome to switch between the two, so this works as a simple solution. 

With this, I can keep my playlists as is and I can add songs I like from Soundcloud. Since the videos are uploaded as private, they work fine in my playlist and won't have copyright issues.


### Install
Download and build the source:
```sh
$ git clone https://github.com/Cyan903/Soundcloud-yt.git
$ pnpm i
$ pnpm run build
$ pnpm start
```

Create and edit your config secret:
```sh
$ cp config/secret_example config/secret.json
$ nano config/secret.json
```
```json
{
    "installed": {
        "client_id": "<client_id>.apps.googleusercontent.com",
        "client_secret": "<client_secret>",
        "redirect_uris": ["http://localhost:8080/oauth2callback"],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token"
    }
}
```

These values should match your YouTube data API. If you haven't setup the data API yet, you can follow the instuctions in [SETUP.md](https://github.com/Cyan903/Soundcloud-yt/blob/main/SETUP.md).
