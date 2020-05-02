import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { showBeneficiaries, deleteBeneficiary } from "../../Services/Beneficiaries/BeneficiariesRequest";
import { capitalize } from "../../Commons/Commons.js";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function BeneficiaryTable(props) {
  const { setSession, setBeneficiary, beneficiaries, setData } = props;
  const classes = useStyles();
  const [list, setList] = useState(beneficiaries)
  const filter_list = (event, beneficiaries) => {
    setList(
      beneficiaries.filter((el) => {
        return el.personal_id.toString().startsWith(event.target.value);
      })
    );
  };
  const deleteRegister = (beneficiary_id) => {
    deleteBeneficiary(beneficiary_id, setSession, setData);
  };
  useEffect(() => {
    const updateList = async () => {
      setList(beneficiaries);
    };
    updateList();
  }, [beneficiaries]);
  return (
    <TableContainer component={Paper}>
      <SearchIcon/>
      <InputBase
        placeholder="Buscar por cedula"
        type="tel"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => filter_list(event, beneficiaries)}
      />
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Opciones</TableCell>
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
          {list &&
            list.map((beneficiary) => (
              <TableRow key={beneficiary.id}>
                <TableCell component="th" scope="row">
                  <Link
                    to="/editar_beneficiario"
                    onClick={() => {setBeneficiary(beneficiary)}}
                  >
                    <EditIcon color="primary" />
                  </Link>
                    <DeleteIcon
                      color="primary"
                      onClick={() => {
                        deleteRegister(beneficiary.id);
                      }}
                    />
                  <Link
                    to="crear_transaccion"
                    onClick={() => {
                      setBeneficiary(beneficiary);
                    }}
                  >
                    <Icon color="primary">add_circle</Icon>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {beneficiary.account_number}
                </TableCell>
                <TableCell align="right">
                  {capitalize(beneficiary.name)}
                </TableCell>
                <TableCell align="right">
                  {capitalize(beneficiary.last_name)}
                </TableCell>
                <TableCell align="right">
                  {capitalize(beneficiary.bank)}
                </TableCell>
                <TableCell align="right">{beneficiary.personal_id}</TableCell>
                <TableCell align="right">
                  {beneficiary.telephone_number}
                </TableCell>
                <TableCell align="right">{beneficiary.mobile_pay}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
