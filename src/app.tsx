import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProjectPage from './pages/project-page/project-page';
import ProjectAddPage from './pages/project-add-page/project-add-page';
import ProjectsPage from './pages/projects-page/projects-page';
import DocumentPage from './pages/document-page/document-page';
import DocumentsPage from './pages/documents-page/documents-page';
import DocumentAddPage from './pages/document-add-page/document-add-page';
import NotFoundPage from './pages/not-found-page/not-found-page';

import './app.css';

const RainRunoff = lazy(() => import('./layouts/rain-runoff/rain-runoff'));
const RainRoof = lazy(() => import('./layouts/rain-roof/rain-roof'));

function App() {
  return (
    <Routes>
      <Route path="projects/:projectPage?" element={(<ProjectsPage />)} />
      <Route path="projects/add" element={(<ProjectAddPage />)} />

      <Route
        path="project"
        element={<Navigate to="/projects" replace />}
      />
      <Route path="project/:projectId" element={(<DocumentsPage />)} />
      <Route path="project/:projectId/add" element={(<DocumentAddPage />)} />

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

      <Route path="*" element={(<NotFoundPage />)} />
    </Routes>
  );
}

export default App;
