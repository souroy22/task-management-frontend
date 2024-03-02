import { Box, CircularProgress, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { getAllUsers } from "../../apis/userApis";
import "./style.css";

type PropTypes = {
  name: string;
  handleChange: (event: any) => void;
  value?: any;
};

const CustomPaper = (props: any) => {
  return <Paper className="custom-options" elevation={8} {...props} />;
};

const CustomAutoCompleteDropdown = ({
  name,
  handleChange,
  value,
}: PropTypes) => {
  const [users, setUsers] = useState<{ name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOnOpen = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data.users);
    setLoading(false);
  };

  return (
    <Box>
      <Autocomplete
        disablePortal
        id="asynchronous-demo"
        options={users}
        onOpen={handleOnOpen}
        loading={loading}
        PaperComponent={CustomPaper}
        isOptionEqualToValue={(option) => option.email === value.email}
        value={value}
        onChange={(_: any, value: any) => handleChange(value)}
        fullWidth
        noOptionsText="No User found"
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label="Assign Task"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default CustomAutoCompleteDropdown;
