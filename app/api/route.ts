import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Simulate a user registration process
  if (body.email && body.password) {
    // Simulate success by returning a 200 response
    return NextResponse.json({
      success: true,
      message: "Registration successful",
    });
  }

  // Simulate error case
  return NextResponse.json(
    { success: false, message: "Registration failed" },
    { status: 400 }
  );
}
