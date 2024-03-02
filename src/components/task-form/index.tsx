import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";

import CustomDateRangeInputs from "../CustomDatePicker";
import CustomAutoCompleteDropdown from "../CustomAutoCompleteDropdown";
import CustomDropdown from "../CustomDropdown";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import "./style.css";
import { createTask, updateTask } from "../../apis/taskApis";
import notification from "../../configs/notification";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../store/task/taskReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../store/store";

type DATA_TYPE = {
  name: string;
  description: string;
  date: [any, any];
  status: string;
  userEmail: any | null;
};

const TaskForm = () => {
  const [data, setData] = useState<DATA_TYPE>({
    name: "",
    description: "",
    date: [null, null],
    status: "TODO",
    userEmail: null,
  });

  const { editingTask } = useSelector((state: RootState) => state.taskReducer);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (name: string, value: any) => {
    if (name === "date") {
      setData({
        ...data,
        date: [dayjs(value[0], "DD/MM/YYYY"), dayjs(value[1], "DD/MM/YYYY")],
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const createMutation = useMutation({
    mutationFn: createTask,
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
  });

  const queryClient = useQueryClient();

  const findDifferentValues = (obj1: any, obj2: any) => {
    const differentValues: any = {};
    for (const key in obj1) {
      if (obj2.hasOwnProperty(key)) {
        if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
          differentValues[key] = obj2[key];
        }
      }
    }
    return differentValues;
  };

  const handleCreateTask = async () => {
    setLoading(true);

    const formattedData = {
      name: data.name,
      description: data.description,
      startDate: moment(data.date[0].$d).format("DD/MM/YYYY"),
      endDate: moment(data.date[1].$d).format("DD/MM/YYYY"),
      status: data.status,
      userEmail: data.userEmail.email,
    };

    try {
      if (!!editingTask) {
        const newEditingFormat = JSON.parse(JSON.stringify(editingTask));
        newEditingFormat["userEmail"] = editingTask?.assignedUser.email;
        await updateMutation.mutateAsync(
          {
            data: findDifferentValues(newEditingFormat, formattedData),
            slug: editingTask.slug,
          },
          {
            onSuccess: () => {
              notification.success("Task updated successfully");
              queryClient.invalidateQueries({ queryKey: ["GET_TASKS"] });
            },
          }
        );
      } else {
        await createMutation.mutateAsync(formattedData, {
          onSuccess: () => {
            notification.success("Task created successfully");
            queryClient.invalidateQueries({ queryKey: ["GET_TASKS"] });
          },
        });
      }
      dispatch(setMode(null));
    } catch (error) {
      if (error instanceof Error) {
        notification.error(error.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!!editingTask) {
      setData({
        name: editingTask.name,
        description: editingTask.description,
        date: [
          dayjs(editingTask.startDate, "DD/MM/YYYY"),
          dayjs(editingTask.endDate, "DD/MM/YYYY"),
        ],
        status: editingTask.status,
        userEmail: editingTask.assignedUser,
      });
    }
  }, []);

  return (
    <Box className="form-container">
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="standard-adornment-password">Task Name</InputLabel>
        <Input
          fullWidth
          name="name"
          onChange={(event: any) => handleChange("name", event.target.value)}
          value={data.name}
        />
      </FormControl>
      <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor="standard-adornment-password">
          Task Description
        </InputLabel>
        <Input
          fullWidth
          name="description"
          onChange={(event: any) =>
            handleChange("description", event.target.value)
          }
          value={data.description}
        />
      </FormControl>
      <FormControl variant="standard" fullWidth>
        <CustomDateRangeInputs
          name="date"
          handleChange={(date: any) => handleChange("date", date)}
          value={data.date}
        />
      </FormControl>
      <FormControl fullWidth>
        <CustomAutoCompleteDropdown
          name="userEmail"
          handleChange={(value: any) => handleChange("userEmail", value)}
          value={data.userEmail}
        />
      </FormControl>
      <FormControl fullWidth>
        <CustomDropdown
          name="status"
          handleChange={(value: any) => handleChange("status", value)}
          value={data.status}
        />
      </FormControl>
      <FormControl fullWidth></FormControl>
      <Button
        variant="contained"
        className="form-create-btn"
        onClick={handleCreateTask}
      >
        {loading ? (
          <CircularProgress
            sx={{
              color: "white",
              width: "25px !important",
              height: "25px !important",
            }}
          />
        ) : (
          <>{!!editingTask ? "Update Task" : "Create Task"}</>
        )}
      </Button>
    </Box>
  );
};

export default TaskForm;
