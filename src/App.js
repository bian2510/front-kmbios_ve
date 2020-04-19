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
import { LoadData } from "./Services/Calls.js";

function App() {
  const session_is_logged = localStorage.length !== 0 ? true : false;
  const [session, setSession] = useState(session_is_logged);
  const [beneficiary, setBeneficiary] = useState(null);
  // For table of transactions
  const [transactions, setTransactions] = useState([])
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([])
  const [temporalData, filterTemporalData] = useState(data);
  const [list, setList] = useState(beneficiaries)

  const navigationProps = {
    data, temporalData, filterTemporalData, session, setSession
  }

  const BeneficiaryFormProps = {
    setSession, setData, beneficiary, session
  }

  const BeneficiaryTableProps = {
    beneficiaries, setData, setSession, filterTemporalData, setBeneficiary, list, setList
  }

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await LoadData(setSession, setBeneficiaries, setTransactions, setUsers);
    };
    fetchData();
  }, [session, data]);
  return (
    <div className="App">
      <Router>
        <Navigation {...navigationProps}/>
        <Switch>
          <Route exact path="/">
            {session === false ? (
              <Redirect to="/sign_in" />
            ) : (
              <BeneficiaryTable {...BeneficiaryTableProps}/>
            )}
          </Route>
          <Route path="/sign_in">
            {session === false ? (
              <FormSignIn setSession={setSession} />
            ) : (
              <Redirect to="/" />
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
                filterTemporalData={filterTemporalData}
                beneficiary={beneficiary}
                session={session}
                users={users}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
