import ConfessionHome from "@/app/components/ConfessionHome";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function Profile() {
  try {
    let confessionsList = [];
    const { data: response } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_CONFESSION_URL}/get-my-confessions`
    );
    const { data } = response;
    confessionsList = data;
    console.log(confessionsList);
  } catch (e) {
    if (e?.response?.data?.status === 301) {
      redirect("/register");
    }
  }
  return <ConfessionHome confessionsList={confessionsList}></ConfessionHome>;
}
