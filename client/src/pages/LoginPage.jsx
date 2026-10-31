import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { loginSchema } from "../features/auth/authSchemas";
import { loginUser } from "../features/auth/authSlice";
import { useAuth } from "../hooks/useAuth";
import FormField from "../components/FormField";
import Button from "../components/Button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isSubmitting } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      const user = await dispatch(loginUser(values)).unwrap();
      toast.success(`Welcome back, ${user.firstName}!`);
      // Redirect is handled by PublicOnlyRoute once the user is in Redux state.
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Log in</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back to HireFlow.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          <FormField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          New to HireFlow?{" "}
          <Link to="/register" className="font-medium text-indigo-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}