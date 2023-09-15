import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("TokenName");
  console.log(token);

  if (!token) {
    return NextResponse.json(
      { isLogout: true },
      {
        status: 200,
      })
  }

  try {
    cookieStore.delete("TokenName");

    const response = NextResponse.json(
      { isLogout: true },
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}