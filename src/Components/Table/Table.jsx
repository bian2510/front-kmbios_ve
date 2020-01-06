import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(account_number, name, lastName, bank, personal_id, telephone_number, mobile_pay) {
  return { account_number, name, lastName, bank, personal_id, telephone_number, mobile_pay };
}

const rows = [
  createData(142134213421, 'Carlos', 'Fabian', 'Banesco', 12313123, 12313123, 12312321),
  createData(142134213421, 'Pedro', 'Jesus', 'Mercantil', 12313123, 12313123, 123123213),
  createData(142134213421, 'Genesis', 'Lismar', 'Provincial', 12313123, 12313123, 123123123),
  createData(142134213421, 'Gleisy', 'Carolina', 'Mercantil', 12313123, 12313123, 12312312)
];

export default function AccountTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Numero de cuenta</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Banco</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Nro Telefono</TableCell>
            <TableCell align="right">Pago Movil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.account_number}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.bank}</TableCell>
              <TableCell align="right">{row.personal_id}</TableCell>
              <TableCell align="right">{row.telephone_number}</TableCell>
              <TableCell align="right">{row.mobile_pay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}