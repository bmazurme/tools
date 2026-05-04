import { useToaster } from '@gravity-ui/uikit';

const useAppToaster = () => {
  const { add: addToast } = useToaster();

  const showSuccess = (title: string, content?: string) => {
    addToast({
      title,
      content,
      theme: 'success',
      name: 'success',
    });
  };

  const showError = (error: string | Error, customTitle = 'Ошибка при загрузке данных') => {
    addToast({
      title: customTitle,
      content: `${error}`,
      theme: 'danger',
      name: 'error',
    });
  };

  return { showSuccess, showError };
};

export default useAppToaster;
