# Soundcloud-yt
![package-version](https://img.shields.io/github/package-json/v/cyan903/Soundcloud-yt) ![last-commit](https://img.shields.io/github/last-commit/cyan903/Soundcloud-yt) ![repo-size](https://img.shields.io/github/repo-size/cyan903/Soundcloud-yt)

Soundcloud-yt is a simple cli that will upload [Soundcloud](https://soundcloud.com/) songs to YouTube. Uses [ffmpeg](https://ffmpeg.org/) to render the video. Video uploads are private by default, this is to prevent copyright claims.

![homepage](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/homepage.png)

For information on how to setup this app, see [SETUP.md](https://github.com/Cyan903/Soundcloud-yt/blob/main/SETUP.md).

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

Many people including myself use YouTube as their main source for listening to music. However, there is a huge selection of music that only exists on Soundcloud. It gets tiresome to switch between the two, so this works as a simple solution. With this, I can keep my playlists as is and I can add songs I like from Soundcloud. Since the videos are uploaded as private, they work fine in my playlist and won't have copyright issues.
