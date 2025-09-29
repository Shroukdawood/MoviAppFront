import React from "react";
import { Entry } from "../typesOfEntry/Entry";

interface EntryTableProps {
  entries: Entry[];
   onEdit: (id: number, entry: Omit<Entry, 'id'>) => void;
  onDelete: (id: number) => void;
}

const EntryTable: React.FC<EntryTableProps> = ({ entries, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Director</th>
          <th>Budget</th>
          <th>Location</th>
          <th>Duration</th>
          <th>Year/Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.title}</td>
            <td>{entry.type}</td>
            <td>{entry.director}</td>
            <td>{entry.budget}</td>
            <td>{entry.location}</td>
            <td>{entry.duration}</td>
            <td>{entry.year_time}</td>
            <td>
              <button onClick={() => onEdit(entry.id, entry)}>Edit</button>
              <button onClick={() => onDelete(entry.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryTable;
