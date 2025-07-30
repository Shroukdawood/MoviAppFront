import React, { useEffect, useState } from 'react';
import { Entry } from '../typesOfEntry/Entry';
import API from '../Api/api';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Button, Box, Dialog, DialogTitle, DialogActions,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import EntryForm from './EntryForm';

const EntryTable = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editEntry, setEditEntry] = useState<Entry | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchEntries = async () => {
    const res = await API.get('/entries?page=${page}');
    const newData = res.data.data;
    setEntries(prev => [...prev, ...newData]);
    setHasMore(res.data.next_page_url !== null);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async () => {
    if (deleteId !== null) {
      await API.delete('/entries/${deleteId}');
      setEntries(prev => prev.filter(e => e.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleUpdate = async (data: Omit<Entry, 'id'>) => {
    if (editEntry) {
      const res = await API.put('/entries/${editEntry.id}, data');
      setEntries(prev =>
        prev.map(e => (e.id === editEntry.id ? res.data : e))
      );
      setEditEntry(null);
    }
  };

  return (
    <Box className="p-4">
      {editEntry && (
        <EntryForm initialData={editEntry} onSubmit={handleUpdate} />
      )}

      <InfiniteScroll
        dataLength={entries.length}
        next={fetchEntries}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Year/Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(entry => (
              <TableRow key={entry.id}>
                <TableCell>{entry.title}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>{entry.director}</TableCell>
                <TableCell>{entry.budget}</TableCell>
                <TableCell>{entry.location}</TableCell>
                <TableCell>{entry.duration}</TableCell>
                <TableCell>{entry.year_time}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditEntry(entry)}>Edit</Button>
                  <Button color="error" onClick={() => setDeleteId(entry.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>

      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EntryTable;

