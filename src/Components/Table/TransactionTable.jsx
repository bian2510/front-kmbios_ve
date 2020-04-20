import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const columns = [
  {
    id: 'user',
    label: 'Asignada',
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  { id: 'id', label: 'Id', minWidth: 10 },
  {
    id: 'bank',
    label: 'Banco',
    minWidth: 15,
    format: (value) => value.toLocaleString(),
  },
  { id: 'account_number', label: 'Cuenta', minWidth: 20 },
  {
    id: 'mobile_pay',
    label: 'Pago Movil',
    minWidth: 10,
  },
  {
    id: 'personal_id',
    label: 'Cedula',
    minWidth: 8,
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'last_name',
    label: 'Apellido',
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'money_sent',
    label: 'Monto',
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Estado',
    minWidth: 10,
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TransactionTable(props) {
  const classes = useStyles();
  const { transactions, beneficiaries, users } = props;
  const [list, setList] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const build_transaction_data = (transaction, beneficiaries, users) => {
    console.log(beneficiaries)
    return {
      id: transaction.id,
      user: users.find((user) => {
        if (user.id === transaction.user_id) {
          return user
        }
      }).email,
      bank: beneficiaries.find((beneficiary) => {
        if (beneficiary.id === transaction.beneficiary_id) {
          return beneficiary
        }
      }).bank,
      account_number: beneficiaries.find((beneficiary) => {
        if (beneficiary.id === transaction.beneficiary_id) {
          return beneficiary
        }
      }).account_number,
      mobile_pay: beneficiaries.find((beneficiary) => {
        if (beneficiary.id === transaction.beneficiary_id) {
          return beneficiary
        }
      }).mobile_pay,
      personal_id: beneficiaries.find((beneficiary) => {
        if (beneficiary.id === transaction.beneficiary_id) {
          return beneficiary
        }
      }).personal_id,
      name: beneficiaries.find((beneficiary) => {
        if (beneficiary.id === transaction.beneficiary_id) {
          return beneficiary
        }
      }).name,
      last_name: beneficiaries.find((beneficiary) => {
        if (beneficiary.id === transaction.beneficiary_id) {
          return beneficiary
        }
      }).last_name,
      money_sent: transaction.money_sent,
      status: (transaction.in_progress === true && transactions.finished === true) ? "Completada" : "En progreso"
    }
  }

  const filter_list = (event, transactions) => {
    setList(
      transactions.filter((transaction) => {
        return transaction.id.toString().startsWith(event.target.value);
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const updateList = async () => {
      setList(transactions);
    };
    updateList();
  }, [transactions]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <SearchIcon/>
        <InputBase
          placeholder="Buscar por cedula"
          type="tel"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => filter_list(event, transactions)}
        />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list &&
            list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => {
              const data = build_transaction_data(transaction, beneficiaries, users)
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                  {columns.map((column) => {
                    const value = data[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

//import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
//import DeleteIcon from '@material-ui/icons/Delete';
//import EditIcon from '@material-ui/icons/Edit';
//import Icon from '@material-ui/core/Icon';
//import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
//import { capitalize } from "../../Commons/Commons.js"
//
//const useStyles = makeStyles({
//  table: {
//    minWidth: 650,
//  },
//})
//// PROBAR QUE ESTE FUNCIONANDO Y AGREGAR LO QUE HAGA FALTA PARA QUE FUNCIONE
//export default function TransactionTable(props) {
//  const { temporalData, setSession, filterTemporalData, setBeneficiary } = props;
//  const classes = useStyles();
//
//  const deleteRegister = (transaction_id) => {deleteTransaction(transaction_id, setSession, filterTemporalData)}
//  return (
//    <TableContainer component={Paper}>
//      <Table className={classes.table} size="small" aria-label="a dense table">
//        <TableHead>
//          <TableRow>
//            <TableCell>Opciones</TableCell>
//            <TableCell align="right">Id</TableCell>
//            <TableCell align="right">Beneficiario</TableCell>
//            <TableCell align="right">Moneda</TableCell>
//            <TableCell align="right">Tasa</TableCell>
//            <TableCell align="right">Dinero recibido</TableCell>
//            <TableCell align="right">Dinero enviado</TableCell>
//            <TableCell align="right">En progreso</TableCell>
//            <TableCell align="right">Finalizada</TableCell>
//            <TableCell align="right">Creada</TableCell>
//          </TableRow>
//        </TableHead>
//        <TableBody>
//          {temporalData.map(transaction => (
//            <TableRow key={transaction.id}>
//              <TableCell component="th" scope="row">
//                <Link to="/editar_transaction" onClick={setTransaction(transaction)}><EditIcon color="primary"/></Link>
//                <Link><DeleteIcon color="primary" onClick={() => {deleteRegister(transaction.id)}}/></Link>
//                <Link to="crear_transaccion" onClick={() => {setTransaction(transaction)}}><Icon color="primary">add_circle</Icon></Link>
//              </TableCell>
//              <TableCell align="right">{transaction.id}</TableCell>
//              <TableCell align="right">{capitalize(transaction.beneficiary_id)}</TableCell>
//              <TableCell align="right">{transaction.currency}</TableCell>
//              <TableCell align="right">{transaction.rate}</TableCell>
//              <TableCell align="right">{transaction.money_received}</TableCell>
//              <TableCell align="right">{transaction.money_sent}</TableCell>
//              <TableCell align="right">{transaction.in_progress}</TableCell>
//              <TableCell align="right">{transaction.finished}</TableCell>
//              <TableCell align="right">{transaction.created_at}</TableCell>
//            </TableRow>
//          ))}
//        </TableBody>
//      </Table>
//    </TableContainer>
//  );
//}