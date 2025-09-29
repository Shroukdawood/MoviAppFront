import './App.css';
import EntryForm from './component/EntryForm';
import EntryTable from './component/EntryTable';
import API from './Api/api';
import { Entry } from './typesOfEntry/Entry';
import { useState, useEffect } from 'react';
const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await API.get<Entry[]>('/entries');
      setEntries(result.data);
    };

    fetchData();
  }, []);

  const handleAdd = async (data: Omit<Entry, 'id'>) => {
    await API.post('/entries', data);
    window.location.reload();
  };

  const handleEdit = async (id: number, data: Omit<Entry, 'id'>) => {
    await API.put(`/entries/${id}`, data);
    window.location.reload();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/entries/${id}`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Favorite Movies & TV Shows</h1>
      <EntryForm onSubmit={handleAdd} />
      <EntryTable entries={entries} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
export default App