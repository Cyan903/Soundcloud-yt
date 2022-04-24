## Install project
First, clone and install the necessary dependencies.
```sh
$ git clone https://github.com/Cyan903/Soundcloud-yt.git
$ cd Soundcloud-yt
$ pnpm i
```

## Setup YouTube's data API
Next, you need to register a new project with [YouTube's data API](https://console.cloud.google.com/apis/credentials). Below is a step by step guide to navigate through the console, but you can also follow Google's official guide [here](https://developers.google.com/youtube/registering_an_application
). Although that doesn't include the steps to setup the credentials.

<p align="center">
    <img src="https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/1.png" />
</p>

Navigate over to the [console](https://console.cloud.google.com/apis/credentials) and create a new project. You can name it whatever you'd like, as it doesn't have an effect on the final outcome.

| ![walkthrough-2](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/2.png) | ![walkthrough-3](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/3.png) |
|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|

Next you have to enable [YouTube's Data API v3](https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com). You can find this by searching for it in the search bar.

<p align="center">
    <img src="https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/4.png" />
</p>

Once enabled, create your credentials. These will be used to log into the app and upload videos.

| ![walkthrough-5](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/5.png) | ![walkthrough-6](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/6.png) |
|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| ![walkthrough-7](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/7.png) | ![walkthrough-8](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/8.png) |

During the credential setup, make sure to set your options as shown above. Especially the authorized redirect urls, application type, and API type.

<p align="center">
    <img src="https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/9.png" />
</p>

Once finished, click the pencil icon to edit your clients.

<p align="center">
    <img src="https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/10.png" />
</p>

Once here, you need to configure `secret.json` in `config/`.
```sh
$ cp config/secret_example config/secret.json
$ nano config/secret.json
```

These values should match up to what you see in the image above.
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

Any changes made in this config should also be reflected in the console (ex, if you change the port in `secret.json`, the redirect url should also have that port.

| ![walkthrough-11](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/11.png) | ![walkthrough-12](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/12.png) |
|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|

Once completed, you need to add yourself as a test user. Navigate to the OAuth consent screen and click "Add Users". Then just simply enter the gmail of the account you want to use.

| ![walkthrough-13](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/13.png) | ![walkthrough-14](https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/14.png) |
|------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|

Now you're done with the console. All that's left is to authorize your account. Run:

```sh
$ pnpm start auth
```
You will be asked to visit a url and enter a code. 

<p align="center">
    <img src="https://raw.githubusercontent.com/Cyan903/Static-github/main/Soundcloud-yt/walkthrough/15.png" />
</p>

Once finished, you should be authorized. Now you can freely upload content with:

```sh
$ pnpm start upload <soundcloud_url>
```

If at any point you need to reauthorize yourself, simply run `soundcloud-yt auth` and login again.
