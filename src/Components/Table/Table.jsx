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
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { deleteBeneficiary } from '../../Services/Calls'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function AccountTable(props) {
  const { temporalData, setUser, filterTemporalData, setBeneficiary } = props;
  const classes = useStyles();
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  const deleteRegister = (beneficiary_id) => {deleteBeneficiary(beneficiary_id, setUser, filterTemporalData)}
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Editar/Borrar</TableCell>
            <TableCell align="right">Numero de cuenta</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Banco</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Nro Telefono</TableCell>
            <TableCell align="right">Pago Movil</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {temporalData.map(beneficiary => (
            <TableRow key={beneficiary.id}>
              <TableCell component="th" scope="row">
                <Link to="/editar_beneficiario" onClick={setBeneficiary(beneficiary)}><EditIcon/></Link>
                <Link><DeleteIcon onClick={() => {deleteRegister(beneficiary.id)}}/></Link>
              </TableCell>
              <TableCell align="right">{beneficiary.account_number}</TableCell>
              <TableCell align="right">{capitalize(beneficiary.name)}</TableCell>
              <TableCell align="right">{capitalize(beneficiary.last_name)}</TableCell>
              <TableCell align="right">{capitalize(beneficiary.bank)}</TableCell>
              <TableCell align="right">{beneficiary.personal_id}</TableCell>
              <TableCell align="right">{beneficiary.telephone_number}</TableCell>
              <TableCell align="right">{beneficiary.mobile_pay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}