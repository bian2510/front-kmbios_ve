import React, {useState, useEffect} from 'react';
import Navigation from './Components/Header/Navigation'
import './App.css';
import AccountTable from './Components/Table/Table';
import FormSignIn from './Components/Form/SignIn'
import FormCreateBeneficiary  from './Components/Form/beneficiaryForm'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { beneficiaryData } from './Services/Calls'

function App() {
  const session = localStorage.length != 0 ? true : false
  const [user, setUser] = useState(session)
  const [data, setData] = useState([]);
  const [temporalData, filterTemporalData] = useState(data)
  useEffect(() => {
    const fetchData = async () => {
      const { data: responseData } = await beneficiaryData(localStorage);
      setData(responseData);
      setTimeout(() => { return; }, 500);
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
            {user == false ? <FormSignIn setUser={setUser}/> : <AccountTable temporalData={temporalData}/>}
          </Route>
          <Route path="/sign_in">
            {user == false ? <FormSignIn setUser={setUser}/> : <AccountTable temporalData={temporalData}/>}
          </Route>
          <Route path="/crear_beneficiario">
            { user == false ? <FormSignIn setUser={setUser}/> : <FormCreateBeneficiary setUser={setUser} 
                                  user={user}
            />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
