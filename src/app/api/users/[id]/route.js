import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(request, { params }) {

  const data = await request.json()

  if (process.env.NODE_ENV === "production") {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("TokenName");
      if (!token) {
        return NextResponse.json(
          { message: "Token not found" },
          { status: 404 }
        );
      }
      const { email, role } = jwt.verify(token.value, process.env.SECRET_KEY);
      if (!email) {
        return NextResponse.json({ message: "Token invalid" }, { status: 401 });
      }
      if (role !== "ADMIN") {
        return NextResponse.json({ message: "User invalid" }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error });
    }
  }

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