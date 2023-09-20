import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {

  // const password = "my-password";
  // const hashedPassword = "my-hashed-password";
  // const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
  // console.log(isPasswordValid);

  const data = await request.json()

  const password = data.password;
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  data.password = hashedPassword

  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: data
  })
  return NextResponse.json(user)
}