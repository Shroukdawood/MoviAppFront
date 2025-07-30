import './App.css';
import EntryForm from './component/EntryForm';
import EntryTable from './component/EntryTable';
import API from './Api/api';
import { Entry } from './typesOfEntry/Entry';

const App = () => {
  const handleAdd = async (data: Omit<Entry, 'id'>) => {
    await API.post('/entries', data);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Favorite Movies & TV Shows</h1>
      <EntryForm onSubmit={handleAdd} />
      <EntryTable />
    </div>
  );
};

export default App