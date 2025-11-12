import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/not-found-page/not-found-page';
import SigninPage from './pages/signin-page/signin-page';
import MainPage from './pages/main-page';
import SettingsPage from './pages/settings-page';
import ProjectsPage from './pages/projects-page';
import ProjectPage from './pages/project-page';
import DocumentsPage from './pages/documents-page';
import RainRoof from './layouts/rain-roof/rain-roof';
import RainRunoff from './layouts/rain-runoff/rain-runoff';

import './app.css';

const ProjectAddPage = lazy(() => import('./pages/project-add-page'));
const ProjectEditPage = lazy(() => import('./pages/project-edit-page'));
const DocumentAddPage = lazy(() => import('./pages/document-add-page'));
const DocumentPage = lazy(() => import('./pages/document-page/document-page'));
const ProfilePage = lazy(() => import('./pages/profile-page'));

function App() {
  return (
    <Routes>
      <Route path="projects/:pageId?" element={(<ProjectsPage />)} />
      <Route path="projects/add" element={(<ProjectAddPage />)} />

      <Route
        path="project"
        element={<Navigate to="/projects" replace />}
      />
      <Route path="project/:projectId" element={(<DocumentsPage />)} />
      <Route path="project/:projectId/add" element={(<DocumentAddPage />)} />
      <Route path="project/:projectId/edit" element={(<ProjectEditPage />)} />

      <Route path="project/:projectId" element={(<ProjectPage />)}>
        <Route
          path="document"
          element={<Navigate to=".." replace />}
        />
        <Route path="document/:id" element={(<DocumentPage />)}>
          <Route path="rain-roof" element={(<RainRoof />)} />
          <Route path="rain-runoff" element={(<RainRunoff />)} />
        </Route>
      </Route>

      <Route path="profile" element={(<ProfilePage />)} />
      <Route path="settings" element={(<SettingsPage />)} />

      <Route path="/" element={(<MainPage />)} />
      <Route path="signin" element={(<SigninPage />)} />
      <Route path="*" element={(<NotFoundPage />)} />
    </Routes>
  );
}

export default App;
