import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
  
  interface Surgeon {
    id: number;
    name: string;
    username: string;
    email: string;
  }
  
  export default function SurgeonTable({ surgeons }: { surgeons: Surgeon[] }) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Input Fields</TableHeaderCell>
            <TableHeaderCell>Input</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surgeons.map((surgeon) => (
            <TableRow key={surgeon.id}>
              <TableCell>{surgeon.name}</TableCell>
              <TableCell>
                <Text>{surgeon.username}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }