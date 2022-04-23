// Video response types

export interface VideoResponse {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Snippet;
    status:  Status;
}

export interface Snippet {
    publishedAt:          string;
    channelId:            string;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         string;
    tags:                 string[];
    categoryId:           string;
    liveBroadcastContent: string;
    defaultLanguage:      string;
    localized:            Localized;
    defaultAudioLanguage: string;
}

export interface Localized {
    title:       string;
    description: string;
}

export interface Thumbnails {
    default: object;
    medium:  object;
    high:    object;
}

export interface Status {
    uploadStatus:        string;
    privacyStatus:       string;
    license:             string;
    embeddable:          boolean;
    publicStatsViewable: boolean;
}
