"use client";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// validate form schema
const createAccountSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters" })
      .regex(/^[a-z ,.'-]+$/i),
    lastName: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters" })
      .regex(/^[a-z ,.'-]+$/i),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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

  const onSubmit: SubmitHandler<CreateAccountFormData> = async (data) => {
    try {
      // Call the server action (API) with form data
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        // Display success toast
        toast({
          title: "Success",
          description: "Account has been successfully created",
        });
        // Reset the form after successful registration
        reset();
      } else {
        // Display error toast if the registration fails
        toast({
          title: "Error",
          description: result.message || "Registration failed",
          variant: "destructive", // Different toast style for errors
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-50">
      <div className="flex justify-center items-center flex-col gap-4 mb-4">
        <h2 className="font-bold text-2xl">Create your account</h2>
        <p className="font-bold text-md">
          Create your account to manage projects
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 mt-4">
          <Input
            data-testid="first-name"
            label="First Name"
            type="text"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
        </div>
        <div className="mb-4 mt-4">
          <Input
            data-testid="last-name"
            label="Last Name"
            type="text"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <div className="mb-4 mt-4">
          <Input
            data-testid="email"
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4 mt-4">
          <Input
            data-testid="password"
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <div className="mb-4 mt-4">
          <Input
            data-testid="confirm-password"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant={"filled"} type="submit">
            Create your account
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateAccountForm;
