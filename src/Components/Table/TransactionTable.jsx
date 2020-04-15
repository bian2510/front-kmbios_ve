import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { capitalize } from "../../Commons/Commons.js"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})
// PROBAR QUE ESTE FUNCIONANDO Y AGREGAR LO QUE HAGA FALTA PARA QUE FUNCIONE
export default function TransactionTable(props) {
  const { temporalData, setSession, filterTemporalData, setBeneficiary } = props;
  const classes = useStyles();

  const deleteRegister = (transaction_id) => {deleteTransaction(transaction_id, setSession, filterTemporalData)}
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Opciones</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Beneficiario</TableCell>
            <TableCell align="right">Moneda</TableCell>
            <TableCell align="right">Tasa</TableCell>
            <TableCell align="right">Dinero recibido</TableCell>
            <TableCell align="right">Dinero enviado</TableCell>
            <TableCell align="right">En progreso</TableCell>
            <TableCell align="right">Finalizada</TableCell>
            <TableCell align="right">Creada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {temporalData.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell component="th" scope="row">
                <Link to="/editar_transaction" onClick={setTransaction(transaction)}><EditIcon color="primary"/></Link>
                <Link><DeleteIcon color="primary" onClick={() => {deleteRegister(transaction.id)}}/></Link>
                <Link to="crear_transaccion" onClick={() => {setTransaction(transaction)}}><Icon color="primary">add_circle</Icon></Link>
              </TableCell>
              <TableCell align="right">{transaction.id}</TableCell>
              <TableCell align="right">{capitalize(transaction.beneficiary_id)}</TableCell>
              <TableCell align="right">{transaction.currency}</TableCell>
              <TableCell align="right">{transaction.rate}</TableCell>
              <TableCell align="right">{transaction.money_received}</TableCell>
              <TableCell align="right">{transaction.money_sent}</TableCell>
              <TableCell align="right">{transaction.in_progress}</TableCell>
              <TableCell align="right">{transaction.finished}</TableCell>
              <TableCell align="right">{transaction.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}