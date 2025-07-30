// import React, { useEffect, useState } from 'react';
// // import { fetchEntries, addEntry, updateEntry, deleteEntry } from '../Api/api';
// import { Entry } from '../typesOfEntry/Entry';
// import EntryForm from '../component/EntryForm';
// import EntryTable from '../component/EntryTable';

// const Home: React.FC = () => {
//   const [entries, setEntries] = useState<Entry[]>([]);
//   const [editing, setEditing] = useState<Entry | null>(null);
//   const [page, setPage] = useState(1);

//   const loadEntries = async () => {
//     const res = await fetchEntries(page);
//     setEntries((prev) => [...prev, ...res.data.data]);
//   };

//   useEffect(() => {
//     loadEntries();
//   }, [page]);

//   const handleAdd = async (data: Omit<Entry, 'id'>) => {
//     if (editing) {
//       const res = await updateEntry(editing.id, data);
//       setEntries((prev) => prev.map(e => (e.id === editing.id ? res.data : e)));
//       setEditing(null);
//     } else {
//       const res = await addEntry(data);
//       setEntries([res.data, ...entries]);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     await deleteEntry(id);
//     setEntries(entries.filter(e => e.id !== id));
//   };

//   return (
//     <div className="mt-6">
//       <EntryForm onSubmit={handleAdd} initialData={editing} />
//       <EntryTable entries={entries} onEdit={setEditing} onDelete={handleDelete} />
//       <button onClick={() => setPage(p => p + 1)} className="mt-4 text-blue-500">Load More</button>
//     </div>
//   );
// };

// export default Home;