import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const data = await request.json();

  if (data.old_password === data.new_password) {
    return NextResponse.json(
      { message: "La clave Nueva debe ser diatinta a la Vieja." },
      { status: 429 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  const isOldPasswordValid = bcrypt.compareSync(
    data.old_password,
    user.password
  );
  if (isOldPasswordValid) {
    const salt = bcrypt.genSaltSync();
    const new_hashed = bcrypt.hashSync(data.new_password, salt);
    const userUpdated = await prisma.user.update({
      where: { email: data.email },
      data: { password: new_hashed },
    });
    return NextResponse.json(userUpdated);
  } else {
    return NextResponse.json(
      { message: "Usuario y/o clave incorrecto." },
      { status: 429 }
    );
  }
}
