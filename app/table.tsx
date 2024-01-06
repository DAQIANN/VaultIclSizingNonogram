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
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Username</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surgeons.map((surgeon) => (
            <TableRow key={surgeon.id}>
              <TableCell>{surgeon.name}</TableCell>
              <TableCell>
                <Text>{surgeon.username}</Text>
              </TableCell>
              <TableCell>
                <Text>{surgeon.email}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }