/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchBar() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={option => option.personal_id}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="Cedula de identidad" variant="outlined" fullWidth />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  {account_number: 142134213421, name: 'Carlos', lastName: 'Fabian', bank: 'Banesco', personal_id: 23654217, telephone_number: 12313123, mobile_pay: 12312321},
  {account_number: 142134213421, name: 'Carlos', lastName: 'Fabian', bank: 'Banesco', personal_id: 11941233, telephone_number: 12313123, mobile_pay: 12312321},
  {account_number: 142134213421, name: 'Carlos', lastName: 'Fabian', bank: 'Banesco', personal_id: 20372123, telephone_number: 12313123, mobile_pay: 12312321},
  {account_number: 142134213421, name: 'Carlos', lastName: 'Fabian', bank: 'Banesco', personal_id: 4876123, telephone_number: 12313123, mobile_pay: 12312321}
];