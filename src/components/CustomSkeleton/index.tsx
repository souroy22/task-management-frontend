import { Box } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomSkeleton = () => {
  return (
    <Box>
      <SkeletonTheme baseColor="#D3D3D3" highlightColor="#E7E7E7">
        <Skeleton
          borderRadius="20px"
          style={{ width: "280px", height: "250px" }}
        />
      </SkeletonTheme>
    </Box>
  );
};

export default CustomSkeleton;
