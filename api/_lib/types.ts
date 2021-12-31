export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    date: string;
    fileType: FileType;
    text: string;
    md: boolean;
    fontSize: string;
    // images: string[];
    // widths: string[];
    // heights: string[];
}
