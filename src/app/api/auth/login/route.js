
import { prisma } from "@/libs/prisma";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email }
  })

  // Verifica que la clave sea correcta
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (user && email === user.email && isPasswordValid) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        email,
        username: user.name,
        role: user.role
      },
      process.env.SECRET_KEY
    );

    const response = NextResponse.json({
      email: user.email,
      name: user.name,
      role: user.role
    });

    response.cookies.set({
      name: "TokenName",
      value: token,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        email: "",
        name: "",
        role: ""
      },
      { status: 200 }
    );
  }
}