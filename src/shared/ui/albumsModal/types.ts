export interface IAlbumData {
	title: string;
	theme: string;
	year: string;
}

export interface IAlbum extends IAlbumData {
	id: number;
	isVisible: boolean;
}
