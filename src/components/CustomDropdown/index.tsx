import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import "./style.css";

type PropTypes = {
  name: string;
  handleChange: (event: any) => void;
  value: string;
};

const CustomDropdown = ({ name, handleChange, value }: PropTypes) => {
  return (
    <Box>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        fullWidth
        name={name}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Status"
        onChange={(event: any) => handleChange(event.target.value)}
      >
        <MenuItem value={"TODO"}>TODO</MenuItem>
        <MenuItem value={"IN_PROGRESS"}>IN PROGRESS</MenuItem>
        <MenuItem value={"DONE"}>DONE</MenuItem>
      </Select>
    </Box>
  );
};

export default CustomDropdown;
