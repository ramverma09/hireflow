import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { registerSchema } from "../features/auth/authSchemas";
import { registerUser } from "../features/auth/authSlice";
import { useAuth } from "../hooks/useAuth";
import FormField from "../components/FormField";
import Button from "../components/Button";

const ROLE_OPTIONS = [
  { value: "candidate", label: "I'm looking for a job" },
  { value: "recruiter", label: "I'm hiring" },
];

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { isSubmitting } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "candidate",
    },
  });

  const onSubmit = async (values) => {
    try {
      const user = await dispatch(registerUser(values)).unwrap();
      toast.success(`Account created. Welcome, ${user.firstName}!`);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Registration failed");
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-500">Start using HireFlow in a minute.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          <fieldset>
            <legend className="text-sm font-medium text-gray-700">I want to</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50"
                >
                  <input
                    type="radio"
                    value={option.value}
                    className="accent-indigo-600"
                    {...register("role")}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.role && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="firstName"
              label="First name"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <FormField
              id="lastName"
              label="Last name"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

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
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <p className="-mt-2 text-xs text-gray-500">
            At least 8 characters, with a letter and a number.
          </p>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}