import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import Calendar from "@mui/icons-material/Event";

type PropTypes = {
  name: string;
  handleChange: (date: any) => void;
  value?: any;
};

const CustomDateRangeInputs = ({ name, handleChange, value }: PropTypes) => {
  console.log("value ------", value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <DateRangePicker
          name={name}
          value={value}
          label="Select Date"
          format="DD/MM/YYYY"
          calendars={1}
          onChange={handleChange}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            textField: { InputProps: { endAdornment: <Calendar /> } },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDateRangeInputs;
