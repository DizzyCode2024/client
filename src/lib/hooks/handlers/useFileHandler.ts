import { axiosInstance } from '@/lib/api';
import useFilesStore from '@/lib/stores/useFileStore';

const useFileHandler = () => {
  const { files, clearFiles } = useFilesStore();

  const fileToBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(new Error(`파일 읽기 오류: ${error}`));
    });

  const uploadFile = async (file: File): Promise<void> => {
    const fileData = await fileToBase64(file);
    try {
      const response = await axiosInstance.post('/upload', {
        fileName: file.name,
        encodedFile: fileData,
      });
      console.log('파일 업로드 성공:', response.data);
    } catch (error) {
      throw new Error(
        `파일 업로드 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  };

  const uploadAllFiles = async (): Promise<void> => {
    try {
      const uploadPromises = files.map((file) => uploadFile(file.file));
      await Promise.all(uploadPromises);
      clearFiles();
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  return { uploadFile, uploadAllFiles };
};

export default useFileHandler;
