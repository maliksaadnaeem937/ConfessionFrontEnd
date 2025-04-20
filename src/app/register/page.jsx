// app/register/page.jsx
import RegisterForm from "../components/RegisterForm";
import { redirect } from "next/navigation";
import axios from "axios";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export default async function RegisterPage() {
  let serverResponse = "";
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");


  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
      {
        headers: {
          // Forward the cookie manually to your backend API
          Cookie: `accessToken=${accessToken?.value || ""}; refreshToken=${
            refreshToken?.value || ""
          }`,
        },
      }
    );
  } catch (err) {
    if (err.response?.status === 301) {
      redirect("/home");
    } else {
    }
  }

  return <RegisterForm serverResponse={serverResponse} />;
}
