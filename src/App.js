import React, { useState, useEffect } from "react";
import Navigation from "./Components/Header/Navigation";
import "./App.css";
import BeneficiaryTable from "./Components/Table/BeneficiaryTable";
import FormSignIn from "./Components/Form/SignIn";
import FormCreateBeneficiary from "./Components/Form/beneficiaryCreateForm";
import FormEditBeneficiary from "./Components/Form/beneficiaryEditForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import FormCreateTransaction from "./Components/Form/TransactionCreateForm";
import TransactionTable from "./Components/Table/TransactionTable";
import { showBeneficiaries } from "./Services/Beneficiaries/BeneficiariesRequest";
import { showTransactions } from "./Services/Transactions/TransactionsRequest";

function App() {
  const session_is_logged = localStorage.length !== 0 ? true : false;
  const [session, setSession] = useState(session_is_logged);
  const [beneficiary, setBeneficiary] = useState(null);
  const [transactions, setTransactions] = useState([])
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [user, setUser] = useState(false)
  const [admin, setAdmin] = useState(false)

  const navigationProps = {
    session, setSession, admin, setAdmin
  }

  const BeneficiaryFormProps = {
    setSession, setData, beneficiary, session
  }

  const BeneficiaryTableProps = {
    beneficiaries, setData, setSession, setBeneficiary
  }

  const TransactionTableProps = {
    transactions, beneficiaries, users, setData, setSession, session
  }

  useEffect(() => {
    const fetchDataBeneficiaries = async () => {
      await showBeneficiaries(setSession, setBeneficiaries);
    };
    const fetchDataTransactions = async () => {
      await showTransactions(setSession, setTransactions);
    };
    fetchDataTransactions();
    fetchDataBeneficiaries();
  }, [session, data]);
  return (
    <div className="App">
      <Router>
        <Navigation {...navigationProps}/>
        <Switch>
          <Route path="/sign_in">
            {session === false ? (
              <FormSignIn setSession={setSession}/>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/admin/sign_in">
            {session === false ? (
              <FormSignIn setSession={setSession} setAdmin={setAdmin} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/">
            {session === false ? (
              <Redirect to="/sign_in" />
            ) : (
              <BeneficiaryTable {...BeneficiaryTableProps}/>
            )}
          </Route>
          <Route path="/crear_beneficiario">
            {session === false ? (
              <Redirect to="/sign_in" />
            ) : (
              <FormCreateBeneficiary {...BeneficiaryFormProps}/>
            )}
          </Route>
          <Route path="/editar_beneficiario">
            {beneficiary === null ? (
              <Redirect to="/sign_in" />
            ) : (
              <FormEditBeneficiary {...BeneficiaryFormProps} />
            )}
          </Route>
          <Route path="/crear_transaccion">
            {beneficiary === null ? (
              <Redirect to="/sign_in" />
            ) : (
              <FormCreateTransaction
                setSession={setSession}
                beneficiary={beneficiary}
                session={session}
                users={users}
              />
            )}
          </Route>
          <Route path="/transacciones">
            {session === false ? (
              <Redirect to="/sign_in" />
            ) : (
              <TransactionTable {...TransactionTableProps}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
