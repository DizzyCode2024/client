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

  const uploadFileBase64 = async (file: File): Promise<void> => {
    const fileData = await fileToBase64(file);
    try {
      const response = await axiosInstance.post('/upload', {
        fileName: file.name,
        encodedFile: fileData,
      });
      console.log('Base64 파일 업로드 성공:', response.data);
    } catch (error) {
      throw new Error(
        `Base64 파일 업로드 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  };

  const uploadFileBinary = async (file: File): Promise<void> => {
    const fileData = await fileToBase64(file);
    console.log('base64 파일 변환 성공', fileData);
    try {
      const response = await axiosInstance.post(
        '/upload/binary',
        {
          fileName: file.name,
          encodedFile: fileData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('바이너리 파일 업로드 성공:', response.data);
    } catch (error) {
      throw new Error(
        `바이너리 파일 업로드 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  };

  const uploadAllFiles = async (): Promise<void> => {
    try {
      const uploadPromises = files.map((file) => {
        return uploadFileBinary(file.file);
      });
      await Promise.all(uploadPromises);
      clearFiles();
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  return { uploadFileBase64, uploadFileBinary, uploadAllFiles };
};

export default useFileHandler;
