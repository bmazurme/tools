import type { ReactNode } from 'react';

export default function ColumnFooter({ children }:
  { children: ReactNode; }) {
  return (
    <div className="column_header">
      {children}
    </div>
  );
}
