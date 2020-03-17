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
import { beneficiaryData } from "./Services/Calls.js";

function App() {
  const session = localStorage.length !== 0 ? true : false;
  const [user, setUser] = useState(session);
  const [beneficiary, setBeneficiary] = useState(null);
  const [data, setData] = useState([]);
  const [temporalData, filterTemporalData] = useState(data);

  const navigationProps = {
    data, temporalData, filterTemporalData, user, setUser
  }

  const BeneficiaryFormProps = {
    setUser, filterTemporalData, beneficiary, user
  }

  const BeneficiaryTableProps = {
    setBeneficiary, temporalData, setUser, filterTemporalData
  }

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await beneficiaryData(setUser, filterTemporalData);
      setData(responseData);
    };
    fetchData();
  }, [user]);
  return (
    <div className="App">
      <Router>
        <Navigation {...navigationProps}/>
        <Switch>
          <Route exact path="/">
            {user === false ? (
              <Redirect to="/sign_in" />
            ) : (
              <BeneficiaryTable {...BeneficiaryTableProps}/>
            )}
          </Route>
          <Route path="/sign_in">
            {user === false ? (
              <FormSignIn setUser={setUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/crear_beneficiario">
            {user === false ? (
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
                setUser={setUser}
                filterTemporalData={filterTemporalData}
                beneficiary={beneficiary}
                user={user}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
