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
  //const build_transaction_data = (transaction, beneficiaries, users) => {
  //  return {
  //    id: transaction.id,
  //    user: users.find((user) => {
  //      if (user.id === transaction.user_id) {
  //        return user
  //      }
  //    }).email,
  //    bank: beneficiaries.find((beneficiary) => {
  //      if (beneficiary.id === transaction.beneficiary_id) {
  //        return beneficiary
  //      }
  //    }).bank,
  //    account_number: beneficiaries.find((beneficiary) => {
  //      if (beneficiary.id === transaction.beneficiary_id) {
  //        return beneficiary
  //      }
  //    }).account_number,
  //    mobile_pay: beneficiaries.find((beneficiary) => {
  //      if (beneficiary.id === transaction.beneficiary_id) {
  //        return beneficiary
  //      }
  //    }).mobile_pay,
  //    personal_id: beneficiaries.find((beneficiary) => {
  //      if (beneficiary.id === transaction.beneficiary_id) {
  //        return beneficiary
  //      }
  //    }).personal_id,
  //    name: beneficiaries.find((beneficiary) => {
  //      if (beneficiary.id === transaction.beneficiary_id) {
  //        return beneficiary
  //      }
  //    }).name,
  //    last_name: beneficiaries.find((beneficiary) => {
  //      if (beneficiary.id === transaction.beneficiary_id) {
  //        return beneficiary
  //      }
  //    }).last_name,
  //    money_sent: transaction.money_sent,
  //    status: (transaction.in_progress === true && transactions.finished === true) ? "Completada" : "En progreso"
  //  }
  //}

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
  console.log(transactions)
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <SearchIcon/>
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
            list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={transaction.id}>
                  {columns.map((column) => {
                    console.log(column)
                    const value = transaction[column.id];
                    return (
                      //<TableCell key={column.id} align={column.align}>
                      //  {column.format && typeof value === 'number' ? column.format(value) : value}
                      //</TableCell>
                      <TableCell align="right">
                        {transaction}
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
