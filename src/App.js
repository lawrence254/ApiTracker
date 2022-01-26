import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ApiForm from './components/Forms/ApiInput/APIForm';
import ApiDataTable from './components/Tables/ApiDataTable';
import './fa/fontawesome';
import { setUpDatabase } from './services/config/config';
import Navigation from './services/config/navigation';

function App() {
  setUpDatabase();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigation />} />
          <Route path="add-key" element={<ApiForm />} />
          <Route path="my-apis" element={<ApiDataTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
