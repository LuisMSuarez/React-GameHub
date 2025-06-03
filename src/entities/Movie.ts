interface VideoData {
  [resolution: string]: string; // array where the index is the resolution (ex 480 or max) and the value is the video url
}

export interface Movie {
  id: number;
  name: string;
  preview: string;
  data: VideoData;
}