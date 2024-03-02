import { Box, Button, Pagination } from "@mui/material";
import { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getMyTasks, getTasks } from "../../apis/taskApis";
import { setMode, setTasks } from "../../store/task/taskReducer";
import { FiPlus } from "react-icons/fi";
import "./style.css";

type PropTypes = {
  children?: ReactNode;
};

const BaseLayout = ({ children }: PropTypes) => {
  const { selectedOption } = useSelector(
    (state: RootState) => state.globalReducer
  );

  const dispatch = useDispatch();

  const { totalCount, page } = useSelector(
    (state: RootState) => state.taskReducer
  );

  const handlePageChange = async (currentPage: number) => {
    let data;
    if (selectedOption.value === "ALL") {
      data = await getTasks(undefined, currentPage);
    } else if (selectedOption.value === "my-tasks") {
      data = await getMyTasks(undefined, currentPage);
    } else {
      data = await getTasks(selectedOption.value, currentPage);
    }
    dispatch(
      setTasks({
        tasks: data.tasks,
        totalCount: data.totalCount,
        page: currentPage,
      })
    );
  };

  return (
    <Box className="main-layout">
      <Sidebar />
      <Box className="main-container">
        <Box className="selected-option-label">
          <Box>{selectedOption.label}</Box>
          <Box>
            <Button
              variant="contained"
              className="create-btn"
              onClick={() => dispatch(setMode("CREATE"))}
            >
              <FiPlus className="plus-icon" /> Create Task
            </Button>
          </Box>
        </Box>
        <Box className="child-container">{children}</Box>
        <Box className="pagination-section">
          <Pagination
            page={page}
            count={Math.ceil(totalCount / 10)}
            onChange={async (_: React.ChangeEvent<unknown>, page: number) =>
              await handlePageChange(page)
            }
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#512da8 !important",
                color: "#fff !important",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#744fca !important",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BaseLayout;
