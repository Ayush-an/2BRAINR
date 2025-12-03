// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginPage from './components/AdminLoginPage.jsx';

//Admin
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CreateSuperUser from './components/admin/CreateSuperUser.jsx';

//Groups
import CreateGroup from './components/groups/CreateGroup.jsx';
import ManageGroups from './components/groups/ManageGroups.jsx';
import RemoveGroup from './components/groups/RemoveGroup.jsx';
import GroupSummary from './components/groups/GroupSummary.jsx';


//Participants
import CreateParticipant from './components/participant/CreateParticipant.jsx';
import ManageParticipants from './components/participant/ManageParticipant.jsx';
import RemoveParticipant from './components/participant/RemoveParticipant.jsx';
import StagingParticipant from './components/participant/StagingParticipant.jsx';
import ActiveParticipant from './components/participant/ActiveParticipant.jsx';
import ParticipantSummary from './components/participant/ParticipantSummary.jsx';

//Exams
import CreateExam from './components/exam/CreateExam.jsx';
import ManageExams from './components/exam/ManageExam.jsx';
import RemoveExam from './components/exam/RemoveExam.jsx';


import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      {/* 🚀 FIX: Add the <Routes> component here */}
      <Routes>
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/create-superuser" element={<ProtectedRoute><CreateSuperUser /></ProtectedRoute>} />

        <Route path="/groups/create" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
        <Route path="/groups/manage" element={<ProtectedRoute><ManageGroups /></ProtectedRoute>} />
        <Route path="/groups/remove" element={<ProtectedRoute><RemoveGroup /></ProtectedRoute>} />
        <Route path="/groups/summary" element={<ProtectedRoute><GroupSummary /></ProtectedRoute>} />

        <Route path="/participants/create" element={<ProtectedRoute><CreateParticipant /></ProtectedRoute>} />
        <Route path="/participants/manage" element={<ProtectedRoute><ManageParticipants /></ProtectedRoute>} />
        <Route path="/participants/remove" element={<ProtectedRoute><RemoveParticipant /></ProtectedRoute>} />
        <Route path="/participants/staging" element={<ProtectedRoute><StagingParticipant /></ProtectedRoute>} />
        <Route path="/participants/active" element={<ProtectedRoute><ActiveParticipant /></ProtectedRoute>} />
        <Route path="/participants/summary" element={<ProtectedRoute><ParticipantSummary /></ProtectedRoute>} />

        <Route path="/exams/create" element={<ProtectedRoute><CreateExam /></ProtectedRoute>} />
        <Route path="/exams/manage" element={<ProtectedRoute><ManageExams /></ProtectedRoute>} />
        <Route path="/exams/remove" element={<ProtectedRoute><RemoveExam /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
export default App;