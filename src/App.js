import './App.css';
import ApiForm from './components/Forms/ApiInput/APIForm';
import CollapsibleTable from './components/Tables/DataTable';
import { setUpDatabase } from './services/config/config';

function App() {
  setUpDatabase();
  return (
    <div className="App">
      <ApiForm />
      <CollapsibleTable />
    </div>
  );
};

export default App;
