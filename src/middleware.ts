import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  // // Check if the user is authenticated
  // const session = req.auth;
  // // If not authenticated, redirect to login
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  // // Role-based authorization
  // if (
  //   req.nextUrl.pathname.startsWith("/admin") &&
  //   session.user.role !== "ADMIN"
  // ) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // // Allow the request to proceed
  return NextResponse.next();
}
