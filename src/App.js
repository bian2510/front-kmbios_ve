import React, {useState, useEffect} from 'react';
import Navigation from './Components/Header/Navigation'
import './App.css';
import AccountTable from './Components/Table/Table';
import FormSignIn from './Components/Form/SignIn'
import FormCreateBeneficiary  from './Components/Form/beneficiaryForm'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import { beneficiaryData } from './Services/Calls'

function App() {
  const session = localStorage.length !== 0 ? true : false
  const [user, setUser] = useState(session)
  const [data, setData] = useState([]);
  const [temporalData, filterTemporalData] = useState(data)
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await beneficiaryData(setUser, filterTemporalData);
      setData(responseData)
    };
    fetchData();
  }, [user]);
  return (

    <div className="App">
      <Router>
        <Navigation data={data} 
                    temporalData={temporalData}
                    filterTemporalData={filterTemporalData}
                    user={user}
                    setUser={setUser}
        />
        <Switch>
          <Route exact path="/">
            {user === false ? <Redirect to="/sign_in"/> : <AccountTable temporalData={temporalData}/>}
          </Route>
          <Route path="/sign_in">
            {user === false ? <FormSignIn setUser={setUser}/> : <Redirect to="/"/>}
          </Route>
          <Route path="/crear_beneficiario">
            { user === false ? <Redirect to="/sign_in"/> : <FormCreateBeneficiary setUser={setUser} filterTemporalData={filterTemporalData} 
                                  user={user}
            />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
