import { Box } from "@mui/material";
import "./style.css";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PopupForm from "../../components/popup-form";
import { setEditingTask, setMode } from "../../store/task/taskReducer";
import TaskForm from "../../components/task-form";
import CustomSkeleton from "../../components/CustomSkeleton";

const Home = () => {
  const { tasks, mode, fetchingTask } = useSelector(
    (state: RootState) => state.taskReducer
  );

  const dispatch = useDispatch();

  if (fetchingTask) {
    return (
      <Box className="task-container">
        {[...Array(8)].map((_, i) => (
          <CustomSkeleton key={i} />
        ))}
      </Box>
    );
  }

  // if (!tasks?.length) {
  //   return (
  // <Box className="no-data-container">
  //   <img
  //     src={"https://www.kpriet.ac.in/asset/frontend/images/nodata.png"}
  //     className="no-data-image"
  //   />
  // </Box>
  //   );
  // }

  return (
    <>
      {!!mode && (
        <PopupForm
          title={mode === "CREATE" ? "Create Task" : "Update Task"}
          open={!!mode}
          handleClose={() => {
            dispatch(setMode(null));
            dispatch(setEditingTask(null));
          }}
          width="max-content"
        >
          <TaskForm />
        </PopupForm>
      )}
      <Box className="task-container">
        {tasks.length ? (
          tasks.map((task) => <Card key={task.slug} data={task} />)
        ) : (
          <Box className="no-data-container">
            <img
              src={"https://www.kpriet.ac.in/asset/frontend/images/nodata.png"}
              className="no-data-image"
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
