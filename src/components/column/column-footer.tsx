import { memo, type ReactNode } from 'react';

const ColumnFooter = memo(({ children }: { children: ReactNode }) => (
  <div className="column_footer">
    {children}
  </div>
));

export default ColumnFooter;
