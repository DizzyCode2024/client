import { create } from 'zustand';
import { IFile, IFileState } from '@/types';

const useFilesStore = create<IFileState>((set) => ({
  files: [],
  addFiles: (newFiles: File[]) => {
    const filesWithPreview: IFile[] = newFiles
      .map((file) => {
        try {
          const preview = URL.createObjectURL(file);
          return {
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            preview,
          };
        } catch (error) {
          console.error('Failed to create URL:', file, error);
          return null;
        }
      })
      .filter((file): file is IFile => file !== null);

    set((state) => {
      const updatedFiles = [...state.files, ...filesWithPreview];
      return { files: updatedFiles };
    });
  },
  removeFile: (fileToRemove: IFile) => {
    set((state) => ({
      files: state.files.filter(
        (file) => file.preview !== fileToRemove.preview,
      ),
    }));
  },
  clearFiles: () => {
    set((state) => {
      state.files.forEach((file) => URL.revokeObjectURL(file.preview));
      return { files: [] };
    });
  },
}));

export default useFilesStore;
