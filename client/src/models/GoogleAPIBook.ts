export interface GoogleAPIVolumeInfo {
  title: string;
  authors: string[];
  description: string;
  imageLinks?: {  // ✅ Ensure this is optional to prevent crashes!
    smallThumbnail: string;
    thumbnail: string;
  };
}

export interface GoogleAPIBook {
  id: string;
  volumeInfo: GoogleAPIVolumeInfo;
}
