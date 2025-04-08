import { redirect } from "next/navigation";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { cookies } from "next/headers";

export default async function RegisterPage() {
  let serverResponse = "";
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
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
    if (err.status === 301) {
      redirect("/home");
    } else {
    }
  }

  return <LoginForm serverResponse={serverResponse} />;
}
