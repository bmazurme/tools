import { Outlet } from 'react-router-dom';

export default function DocumentsPage() {
  return (
    <div>
      <div>
        <div>
          Documents title [edit] [delete]
        </div>
      </div>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}
