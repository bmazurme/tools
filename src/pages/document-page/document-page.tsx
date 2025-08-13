import { Outlet } from 'react-router';

export default function DocumentPage() {
  return (
    <div>
      <div>
        <div>
          Document title [edit] [delete]
        </div>
      </div>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}
