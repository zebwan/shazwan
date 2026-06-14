// ============================================================
// APP — Root component with routing
// Removed custom cursor for better mobile experience
// ============================================================
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import WorkDetail from './pages/WorkDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:id" element={<WorkDetail />} />
    </Routes>
  )
}
