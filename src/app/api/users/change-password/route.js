import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  // Parameters: email, old_password, new_password
  const data = await request.json();

  if (process.env.NODE_ENV === "production") {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("TokenName");
      if (!token) {
        return NextResponse.json({ message: "Token not found" }, { status: 404 });
      }
      const { email } = jwt.verify(token.value, process.env.SECRET_KEY);
      if (!email) {
        return NextResponse.json({ message: "Token invalid" }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error });
    }
  }

  if (data.old_password === data.new_password) {
    return NextResponse.json(
      { message: "La clave Nueva debe ser distinta a la Anterior." },
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
    return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 422 })
  }
}
