import { axiosInstance } from '@/lib/api';
import useFilesStore from '@/lib/stores/useFileStore';

const useFileHandler = () => {
  const { files, clearUploadedUrls, addUploadedUrl } = useFilesStore();

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const base64String = event.target?.result;
        const pureBase64 = base64String?.split(',')[1];
        resolve(pureBase64);
      };
      reader.onerror = (error) => reject(new Error(`파일 읽기 오류: ${error}`));
    });

  const uploadFile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axiosInstance.post('/file/upload', formData);
      console.log('파일 업로드 성공:', response.data);
      const url = response.data.urls[0];
      addUploadedUrl(url);
    } catch (error) {
      console.error('파일 업로드 요청 실패:', error);
      throw new Error(
        `파일 업로드 오류: ${error.response?.data?.message || error.message}`,
      );
    }
  };

  const uploadFileBinary = async (file: File): Promise<void> => {
    const fileData = await fileToBase64(file);
    try {
      const response = await axiosInstance.post('/file/upload/binary', [
        {
          fileName: file.name,
          encodedFile: fileData,
        },
      ]);
      console.log('바이너리 파일 업로드 성공:', response.data);
      const url = response.data.urls[0];
      addUploadedUrl(url);
    } catch (error) {
      console.error('바이너리 파일 업로드 실패:', error);
      throw new Error(
        `바이너리 파일 업로드 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  };

  const uploadAllFiles = async (): Promise<void> => {
    try {
      clearUploadedUrls();

      const hasLargeFile = files.some((file) => file.size > 1048576);

      if (hasLargeFile) {
        const uploadPromises = files.map((file) => uploadFileBinary(file.file));
        await Promise.all(uploadPromises);
      } else {
        const uploadPromises = files.map((file) => uploadFile(file.file));
        await Promise.all(uploadPromises);
      }
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  return { uploadFile, uploadFileBinary, uploadAllFiles };
};

export default useFileHandler;
