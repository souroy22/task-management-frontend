import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signin } from "../../apis/authApis";
import { customLocalStorage } from "../../services/utils/localStorage";
import { setUserData } from "../../store/user/userReducer";
import notification from "../../configs/notification";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import TextInput from "../../components/TextInput";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: signin,
  });

  const handleSignin: SubmitHandler<FormValues> = async (data) => {
    try {
      const res: any = await mutation.mutateAsync(data);
      customLocalStorage.setData("token", res.token);
      dispatch(setUserData({ ...res.user }));
      //   dispatch(setJoinedRooms(res.user.joinedRooms));
      navigate(
        location.state?.prevUrl && location.state.prevUrl !== "/signin"
          ? location.state.prevUrl
          : "/"
      );
      notification.success("Signed up successfully");
    } catch (error) {
      if (error instanceof Error) {
        notification.error(error.message);
      }
    }
  };

  return (
    <form
      action="#"
      className="sign-in-form"
      onSubmit={handleSubmit(handleSignin)}
    >
      <h2 className="title">Sign in</h2>
      <TextInput
        name="email"
        type="email"
        placeholder="Enter Email address"
        required={true}
        errors={errors}
        register={register}
        StartIcon={MdOutlineAlternateEmail}
      />
      <TextInput
        type="password"
        name="password"
        placeholder="Enter password"
        required={true}
        errors={errors}
        register={register}
        StartIcon={RiLockPasswordFill}
        EndIcon={FaRegEyeSlash}
        EndIconClick={FaEye}
      />
      <Button
        type="submit"
        variant="contained"
        className={`btn ${mutation.isPending ? "disabled" : ""}`}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <CircularProgress
            sx={{
              color: "white",
              width: "25px !important",
              height: "25px !important",
            }}
          />
        ) : (
          "Sign In"
        )}
      </Button>
      <p className="social-text">Or Sign in with social platforms</p>
    </form>
  );
};

export default Login;
