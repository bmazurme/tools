import { memo } from 'react';
import { Text } from '@gravity-ui/uikit';

type ResultType = {
  fieldConfig: {
    key: string;
    hasContent: boolean;
    content?: string;
    value?: number;
  }[];
  style: {
    readonly [key: string]: string;
  };
};

const ColumnFooterFields = memo(({ fieldConfig, style }: ResultType) => (
  <div className="fields">
    {fieldConfig.map(({
      key, hasContent, content, value,
    }) => (
      <Text
        key={key}
        variant="code-1"
        className={style[key]}
      >
        {hasContent && (content ?? (value?.toFixed(2)))}
      </Text>
    ))}
  </div>
));

export default ColumnFooterFields;
