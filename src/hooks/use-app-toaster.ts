import { useToaster } from '@gravity-ui/uikit';
import getErrorMessage from '../utils/get-error-message';

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

  const showError = (error: unknown, customTitle = 'Ошибка при загрузке данных') => {
    addToast({
      title: customTitle,
      content: getErrorMessage(error),
      theme: 'danger',
      name: 'error',
    });
  };

  return { showSuccess, showError };
};

export default useAppToaster;
