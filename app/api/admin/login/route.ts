import { NextResponse } from "next/server";
import { signAdmin, TOKEN_NAME } from "../../../../lib/adminAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password, email } = body || {};

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    // Si viene email, validar email y password (modo viejo)
    // Si solo viene password, validar solo password (modo nuevo)
    if (email) {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail || email !== adminEmail || password !== adminPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
    } else {
      if (password !== adminPassword) {
        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
      }
    }

    const token = signAdmin({ role: "admin", email: email || "admin" });

    const res = NextResponse.json({ ok: true, token });
    res.cookies.set({ name: TOKEN_NAME, value: token, httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
