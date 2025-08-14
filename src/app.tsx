import { Route, Routes } from 'react-router';

import ProjectPage from './pages/project-page/project-page';
import ProjectAddPage from './pages/project-add-page/project-add-page';
import ProjectsPage from './pages/projects-page/projects-page';
import DocumentPage from './pages/document-page/document-page';
import DocumentAddPage from './pages/document-add-page/document-add-page';
import NotFoundPage from './pages/not-found-page/not-found-page';

import RainRunoff from './layouts/rain-runoff/rain-runoff';
import RainRoof from './layouts/rain-roof/rain-roof';

import './app.css'

function App() {
  return (
    <Routes>
      <Route path="projects" element={(<ProjectsPage />)} />
      <Route path="project/add" element={(<ProjectAddPage />)} />
      
      <Route path="project/:projectId" element={(<ProjectPage />)}>
        <Route path="document" element={(<DocumentPage />)}>
          <Route path="rain-roof/:id" element={(<RainRoof />)} />
          <Route path="rain-runoff/:id" element={(<RainRunoff />)} />
        </Route>
        <Route path="document/add" element={(<DocumentAddPage />)} />
      </Route>

      <Route path="*" element={(<NotFoundPage />)} />
    </Routes>
  )
}

export default App;
