import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import TransactionEditForm from '../Form/TransactionEditForm'
import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';

const columns = [
  {
    id: "user",
    label: "Asignada",
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  { id: "id", label: "Id", minWidth: 10 },
  {
    id: "bank",
    label: "Banco",
    minWidth: 15,
    format: (value) => value.toLocaleString(),
  },
  { id: "account_number", label: "Cuenta", minWidth: 20 },
  {
    id: "mobile_pay",
    label: "Pago Movil",
    minWidth: 10,
  },
  {
    id: "personal_id",
    label: "Cedula",
    minWidth: 8,
    format: (value) => value.toLocaleString(),
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  {
    id: "money_sent",
    label: "Monto",
    minWidth: 15,
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Estado",
    minWidth: 10,
    format: (value) => value.toFixed(2),
  },
  {
    id: "voucher",
    label: "Comprobante",
    minWidth: 10,
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function TransactionTable(props) {
  const classes = useStyles();
  const { transactions } = props;
  const [list, setList] = useState([]);
  const [page, setPage] = React.useState(0);
  var [button, setButton] = useState(true);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const updateTransaction = () => {
    
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
        <SearchIcon />
        <InputBase
          placeholder="Buscar por id"
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
              list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={transaction.id}
                    >
                      <TableCell>{transaction.user.email}</TableCell>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.beneficiary.bank}</TableCell>
                      <TableCell>
                        {transaction.beneficiary.account_number}
                      </TableCell>
                      <TableCell>
                        {transaction.beneficiary.mobile_pay}
                      </TableCell>
                      <TableCell>
                        {transaction.beneficiary.personal_id}
                      </TableCell>
                      <TableCell>{transaction.beneficiary.name}</TableCell>
                      <TableCell>{transaction.beneficiary.last_name}</TableCell>
                      <TableCell>{transaction.money_sent}</TableCell>
                      <TableCell>
                        {transaction.in_progress && transaction.finished
                          ? "Completada"
                          : "En progreso"}
                      </TableCell>
                      <TableCell>
                        <TransactionEditForm transaction={transaction}/>
  </TableCell>
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
