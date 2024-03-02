import { Button, CircularProgress } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../apis/authApis";
import notification from "../../configs/notification";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/user/userReducer";
import { customLocalStorage } from "../../services/utils/localStorage";
import { FaEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const mutation = useMutation({
    mutationFn: signup,
  });

  const handleSignup: SubmitHandler<FormValues> = async (data) => {
    try {
      const user: any = await mutation.mutateAsync(data);
      customLocalStorage.setData("token", user.token);
      dispatch(setUserData({ ...user.user }));
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
      className="sign-up-form"
      autoComplete="off"
      onSubmit={handleSubmit(handleSignup)}
    >
      <h2 className="title">Sign up</h2>
      <TextInput
        type="text"
        name="name"
        placeholder="Enter fullname"
        required={true}
        minLength={3}
        maxLength={50}
        errors={errors}
        register={register}
        StartIcon={FaUser}
      />
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
        placeholder="Enter a strong password"
        required={true}
        minLength={8}
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
          "Sign up"
        )}
      </Button>
      <p className="social-text">Or Sign up with social platforms</p>
    </form>
  );
};

export default Signup;
