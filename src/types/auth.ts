// YouTube auth types

export interface Video {
    title: string, 
    description: string, 
    tags: string[],
    vid: string,
    thumb: string
}

export interface Secrets {
    installed: Installed;
}

export interface Installed {
    client_id:     string;
    client_secret: string;
    redirect_uris: string[];
    auth_uri:      string;
    token_uri:     string;
}

/*****************************/
export interface OAuth {
    access_token:  string;
    refresh_token: string;
    scope:         string;
    token_type:    string;
    expiry_date:   number;
}
