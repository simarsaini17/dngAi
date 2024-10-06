"use client";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const createAccountSchema = z
  .object({
    firstName: z
      .string()
      .regex(/^[a-z ,.'-]+$/i)
      .min(2, { message: "First Name must be at least 2 characters" }),
    lastName: z
      .string()
      .regex(/^[a-z ,.'-]+$/i)
      .min(2, { message: "Last Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password confirmation is required" }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;

const CreateAccountForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<CreateAccountFormData> = (data) => {
    // Show success toast
    toast({
      title: "Success",
      description: "Account has been successfully created",
    });

    // Reset the form to its default values
    reset();
  };

  return (
    <div className="">
      <h2 className="font-bold">Create your account</h2>
      <p>Create your account to manage projects</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="First Name"
          type="text"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          type="text"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <div className="mt-4">
          <Button variant={"filled"} type="submit">
            Create your account
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateAccountForm;
