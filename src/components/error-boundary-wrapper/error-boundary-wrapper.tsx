import { type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Button, Text } from '@gravity-ui/uikit';

import ContentWrapper from '../content/content';
import style from './error-boundary-wrapper.module.css';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

interface ErrorWithMessage {
  message: string | unknown;
}

interface ErrorWithToString {
  toString: () => string;
}

function hasMessage(obj: unknown): obj is ErrorWithMessage {
  return (
    obj !== null
    && typeof obj === 'object'
    && 'message' in obj
  );
}

function hasToString(obj: unknown): obj is ErrorWithToString {
  return (
    obj !== null
    && typeof obj === 'object'
    && 'toString' in obj
    && typeof (obj as { toString: unknown }).toString === 'function'
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const getErrorMessage = (): string => {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    if (hasMessage(error)) {
      return String(error.message);
    }

    if (hasToString(error)) {
      return error.toString();
    }

    return 'Произошла непредвиденная ошибка';
  };

  const errorMessage = getErrorMessage();
  const navigate = useNavigate();

  const navigateHome = () => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <ContentWrapper>
      <section className="error">
        <Text variant="header-2">APP-ERROR</Text>
        <div className={style.description}>
          <Text variant="code-3">{errorMessage}</Text>
        </div>
        <div className={style.block}>
          <Text variant="subheader-2">Try to</Text>
          <Button
            view="outlined-utility"
            size="m"
            onClick={resetErrorBoundary}
          >
            Reload app
          </Button>
          <Text variant="subheader-2">or</Text>
          <Button
            view="outlined-action"
            size="m"
            onClick={navigateHome}
          >
            Go to homepage
          </Button>
        </div>
      </section>
    </ContentWrapper>
  );
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary
      onReset={() => console.log('reset')}
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}
