import { Box, Button, Menu, MenuItem } from "@mui/material";
import "./style.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TASK_TYPE, setEditingTask } from "../../store/task/taskReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PopupForm from "../popup-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../apis/taskApis";
import notification from "../../configs/notification";

type PropTypes = {
  data: TASK_TYPE;
};

const menuOptions = [
  { label: "Update Task", ICON: EditIcon },
  { label: "Delete Task", ICON: DeleteForeverIcon },
];

const Card = ({ data }: PropTypes) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
  });

  const handleConfirm = async () => {
    await deleteMutation.mutateAsync(data.slug, {
      onSuccess: () => {
        notification.success("Task deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["GET_TASKS"] });
      },
    });
  };

  const dispatch = useDispatch();

  const handleClick = (optionName: string) => {
    if (optionName === "Update Task") {
      dispatch(setEditingTask(data));
    } else {
      setOpenConfirmDialog(true);
    }
    setAnchorEl(null);
  };

  return (
    <Box className="card-container">
      {openConfirmDialog && (
        <PopupForm
          title="Are you sure to delete?"
          handleClose={() => setOpenConfirmDialog(false)}
          open={openConfirmDialog}
          width="280px"
        >
          <Box className="confirm-buttons-section">
            <Button>cancel</Button>
            <Button variant="contained" color="error" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </PopupForm>
      )}
      <BsThreeDotsVertical
        className="three-dot-icon"
        onClick={(event: any) => setAnchorEl(event.currentTarget)}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuOptions.map(({ label, ICON }) => (
          <MenuItem onClick={() => handleClick(label)}>
            <ICON className={`icon-${label.toLowerCase()}`} />
            {label}
          </MenuItem>
        ))}
      </Menu>
      <Box className="card-title">{data.name}</Box>
      <Box className="card-description">{data.description}</Box>
      <Box className="card-data">
        <Box className="data-title">Due Date:</Box>
        <Box className="data-value">{data.endDate}</Box>
      </Box>
      <Box className="card-data">
        <Box className="data-title">Created By:</Box>
        <Box className="data-value">{data.createdBy.name}</Box>
      </Box>
      <Box className="card-data">
        <Box className="data-title">Assigned to:</Box>
        <Box className="data-value">{data.assignedUser.name}</Box>
      </Box>
      <Box className={`status ${data.status.toLowerCase()}`}>{data.status}</Box>
    </Box>
  );
};

export default Card;
