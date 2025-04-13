import axios from "axios";
import { redirect } from "next/navigation";
import ConfessionHome from "@/app/components/ConfessionHome";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // 👈 Ensures SSR, not static

export default async function Home() {
  let confessionsList = [];
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  try {
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_CONFESSION_URL}/home`,
      {
        headers: {
          // Forward the cookie manually to your backend API
          Cookie: `accessToken=${accessToken?.value || ""}; refreshToken=${
            refreshToken?.value || ""
          }`,
        },
      }
    );
    const { data } = response;
    confessionsList = data;
  } catch (e) {
    if (e.response?.status === 301) {
      redirect("/register");
    }
  }

  return <ConfessionHome confessionsList={confessionsList}></ConfessionHome>;
}
