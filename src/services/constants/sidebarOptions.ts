import { TiThSmallOutline } from "react-icons/ti";
import { SELECTED_OPTIONS } from "../../store/global/globalReducer";
import { IconType } from "react-icons";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { FcHome } from "react-icons/fc";

interface SELECTED_OPTIONS_WITH_ICON extends SELECTED_OPTIONS {
  ICON: IconType;
}

export const sidebarOptions: SELECTED_OPTIONS_WITH_ICON[] = [
  { label: "All Tasks", value: "ALL", ICON: TiThSmallOutline },
  { label: "TODO", value: "TODO", ICON: LuListTodo },
  { label: "In Progress", value: "IN_PROGRESS", ICON: GrInProgress },
  { label: "Completed", value: "DONE", ICON: IoMdDoneAll },
  { label: "My Tasks", value: "my-tasks", ICON: FcHome },
];
