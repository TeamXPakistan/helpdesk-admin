import { saveAs } from 'file-saver';

export const downloadFile = (data: any, filename: string, mimeType: string) => {
    const blob = new Blob([data], { type: mimeType });
    saveAs(blob, filename);
};
