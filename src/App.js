import React, {useState, useEffect} from 'react';
import Navigation from './Components/Header/Navigation'
import './App.css';
import AccountTable from './Components/Table/Table';
import FormSignIn from './Components/Form/SignIn'
import FormCreateBeneficiary  from './Components/Form/beneficiaryForm'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { beneficiaryData, signIn, signOut } from './Services/Calls'

function App() {
  const beneficiary = [
    {id: 1, account_number: 142134213421, name: 'Fabian', lastName: 'Hernandez', bank: 'Banesco', personal_id: "23654217", telephone_number: 12313123, mobile_pay: 12312321},
    {id: 2, account_number: 142134213421, name: 'Fabian', lastName: 'Hernandez', bank: 'Banesco', personal_id: "11941233", telephone_number: 12313123, mobile_pay: 12312321},
    {id: 3, account_number: 142134213421, name: 'Carlos', lastName: 'Hernandez', bank: 'Banesco', personal_id: "20372123", telephone_number: 12313123, mobile_pay: 12312321},
    {id: 4, account_number: 142134213421, name: 'Carlos', lastName: 'Hernandez', bank: 'Banesco', personal_id: "4876123", telephone_number: 12313123, mobile_pay: 12312321}
  ]
  const [user, setUser] = useState({})
  const [data, setData] = useState([]);
  const [temporalData, filterTemporalData] = useState(data)
  useEffect(() => {
    const fetchData = async () => {
      const { data: responseData } = await beneficiaryData(user, setUser);
      console.log(user)
      setData(responseData);
    };
    fetchData();
  }, [user]);
  return (

    <div className="App">
        <Navigation data={data} 
                    temporalData={temporalData}
                    filterTemporalData={filterTemporalData}
                    user={user}
                    signOut={signOut}
                    setUser={setUser}
        />
            <AccountTable temporalData={temporalData}/>
            <FormSignIn signIn={signIn} setUser={setUser}/>                
            <FormCreateBeneficiary/>
    </div>
  );
}

export default App;
