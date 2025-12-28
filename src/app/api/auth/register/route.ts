import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/src/lib/prisma";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // 1. Validasi data
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // 2. Cek email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan user ke PostgreSQL
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Response sukses
    return NextResponse.json(
      { success: true, message: "Registrasi berhasil" },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
