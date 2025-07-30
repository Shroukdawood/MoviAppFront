import React, { useState, useEffect } from 'react';
import { Entry } from '../typesOfEntry/Entry';
import { TextField, Button, MenuItem, Box } from '@mui/material';

interface Props {
  onSubmit: (data: Omit<Entry, 'id'>) => void;
  initialData?: Entry;
}

const EntryForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Omit<Entry, 'id'>>({
    title: '',
    type: 'Movie',
    director: '',
    budget: '',
    location: '',
    duration: '',
    year_time: '',
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box component="form" onSubmit={e => {
      e.preventDefault();
      onSubmit(formData);
    }} className="space-y-4 p-4 bg-white shadow rounded">
      <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} />
      <TextField select fullWidth label="Type" name="type" value={formData.type} onChange={handleChange}>
        <MenuItem value="Movie">Movie</MenuItem>
        <MenuItem value="TV Show">TV Show</MenuItem>
      </TextField>
      <TextField fullWidth label="Director" name="director" value={formData.director} onChange={handleChange} />
      <TextField fullWidth label="Budget" name="budget" value={formData.budget} onChange={handleChange} />
      <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} />
      <TextField fullWidth label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
      <TextField fullWidth label="Year/Time" name="year_time" value={formData.year_time} onChange={handleChange} />
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default EntryForm;