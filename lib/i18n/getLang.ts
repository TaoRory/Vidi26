import { cookies } from "next/headers";
import type { Lang } from "./translations";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const val = cookieStore.get("vidi26-lang")?.value;
  return val === "en" ? "en" : "vi";
}
