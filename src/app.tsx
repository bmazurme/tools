import {
  Navigate,
  Route, Routes,
} from 'react-router-dom';

import NotFoundPage from './pages/not-found-page';
import SigninPage from './pages/signin-page/signin-page';
import MainPage from './pages/main-page';
import ProfilePage from './pages/profile-page';
import SettingsPage from './pages/settings-page';
import SubscriptionsPage from './pages/subscriptions-page';
import ProjectsPage from './pages/projects-page';
import ProjectAddPage from './pages/project-add-page';
import ProjectEditPage from './pages/project-edit-page';
import ProjectPage from './pages/project-page';
import DocumentPage from './pages/document-page';
import DocumentsPage from './pages/documents-page';
import DocumentAddPage from './pages/document-add-page';
import ChatPage from './pages/chat-page';

import DynamicTypeLayout from './layouts/dynamic-type-layout';
import DynamicTemplateLayout from './layouts/dynamic-template-layout';

import { useAppLocation } from './hooks/use-app-location';

import './app.css';

function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;

  return (
    <>
      <Routes location={background || location}>
        <Route
          path="project"
          element={<Navigate to="/projects" replace />}
        />
        <Route path="profile" element={(<ProfilePage />)} />
        <Route path="settings" element={(<SettingsPage />)} />
        <Route path="subscriptions" element={(<SubscriptionsPage />)} />
        <Route path="/" element={(<MainPage />)} />
        <Route path="projects" element={(<ProjectsPage />)} />
        <Route path="project/:projectId" element={(<DocumentsPage />)} />
        <Route path="project/:projectId/add" element={(<DocumentAddPage />)} />

        <Route path="projects/add" element={(<ProjectAddPage />)} />
        <Route path="project/:projectId/edit" element={(<ProjectEditPage />)} />
        <Route path="project/:projectId" element={(<ProjectPage />)}>
          <Route
            path="document"
            element={<Navigate to=".." replace />}
          />
          <Route path="document" element={(<DocumentPage />)}>
            <Route
              path=":id"
              element={<Navigate to=".." replace />}
            />
            <Route path=":id/:typeId" element={(<DynamicTypeLayout />)} />
            <Route path=":id/:typeId/:itemId" element={<DynamicTemplateLayout />} />
          </Route>
        </Route>

        <Route path="chat" element={(<ChatPage />)} />

        <Route path="signin" element={(<SigninPage />)} />
        <Route path="*" element={(<NotFoundPage />)} />
      </Routes>

      {background
      && (
        <Routes>
          {/* <Route
              path="project/:projectId/document/:id/rain-roof/details/:itemId"
              element={(<RainRoofDetailPage />)}
            /> */}
        </Routes>
      )}
    </>
  );
}

export default App;
