import { Avatar, Box } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sidebarOptions } from "../../services/constants/sidebarOptions";
import {
  SIDEBAR_OPTIONS,
  selectOption,
} from "../../store/global/globalReducer";
import { HiOutlineLogout } from "react-icons/hi";
import { getMyTasks, getTasks } from "../../apis/taskApis";
import { setFetchingTask, setTasks } from "../../store/task/taskReducer";
import notification from "../../configs/notification";
import { signout } from "../../apis/authApis";
import { logoutUser } from "../../store/user/userReducer";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const selectedOption = useSelector(
    (state: RootState) => state.globalReducer.selectedOption
  );

  const dispatch = useDispatch();

  const stringAvatar = (name: string) => {
    if (!name?.trim()) {
      return "USER";
    }
    const splittedText = name.split(" ");
    let avatarText = "";
    for (const text of splittedText) {
      avatarText += text[0];
    }
    return avatarText;
  };

  const handleGetTasks = async (status: SIDEBAR_OPTIONS) => {
    dispatch(setFetchingTask(true));
    let data;
    if (status === "ALL") {
      data = await getTasks();
    } else if (status === "my-tasks") {
      data = await getMyTasks();
    } else {
      data = await getTasks(status);
    }
    dispatch(
      setTasks({
        tasks: data.tasks,
        totalCount: Number(data.totalCount),
        page: 1,
      })
    );
    dispatch(setFetchingTask(false));
    return data;
  };

  useQuery({
    queryKey: ["GET_TASKS", selectedOption.value],
    queryFn: () => handleGetTasks(selectedOption.value),
    retry: false,
  });

  const handleLogout = async () => {
    try {
      await signout();
      dispatch(logoutUser());
      notification.success("Logged out successfully");
    } catch (error) {
      if (error instanceof Error) {
        notification.error(error.message);
      }
    }
  };

  return (
    <Box className="sidebar-container">
      <Box>
        <Box className="sidebar-top-container">
          <Avatar>{stringAvatar(user.name || "")}</Avatar>
          <Box className="user-name">{user.name}</Box>
        </Box>
        <Box className="sidebar-mid">
          {sidebarOptions.map(({ label, value, ICON }) => (
            <Box
              key={value}
              className={`sidebar-option ${
                selectedOption.value === value ? "selected-options" : ""
              }`}
              onClick={async () => {
                await handleGetTasks(value);
                dispatch(selectOption({ label, value }));
              }}
            >
              <Box>
                <ICON />
              </Box>
              <Box>{label}</Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="sidebar-bottom" onClick={handleLogout}>
        <Box className="logout-icon">
          <HiOutlineLogout />
        </Box>
        <Box className="logout-text">Logout</Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
