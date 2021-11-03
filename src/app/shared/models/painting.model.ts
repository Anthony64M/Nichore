export interface Painting {
    links: {
        self: string;
        web: string;
    };
    id: string;
    objectNumber: string;
    title: string;
    hasImage: boolean;
    principalOrFirstMaker: string;
    longTitle: string;
    showImage: boolean;
    permitDownload: boolean;
    webImage: {};
    headerImage: {};
}