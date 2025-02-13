// app/api/invite/route.ts
import { rootURL } from "@/app/api/main";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, workspaceID } = await req.json();

    const inviteLink = `${rootURL}/workspace/${workspaceID}/invitation`;

    const transporter = nodemailer.createTransport({
      port: 587,
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log({
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Slack Clone" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Invitation to join a Slack Clone workspace",
      html: `
        <p>You have been invited to join a workspace.</p>
        <p><a href="${inviteLink}">Click here to accept the invitation</a></p>
      `,
    });
    return NextResponse.json({ message: "Invitation sent", status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
