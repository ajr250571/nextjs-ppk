import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("TokenName");

  if (!token) {
    // return res.status(401).json({ error: "Not logged in" });
    return NextResponse.json({
      email: "",
      username: ""
    })
  }

  const { email, username } = jwt.verify(token.value, process.env.SECRET_KEY);

  return NextResponse.json({
    email,
    username,
  });
}
