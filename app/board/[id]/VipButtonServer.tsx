import { cookies } from "next/headers";
import VipButton from "./VipButton";

const VipButtonServer = async () => {
  const cookieStore = await cookies();
  const isVip = cookieStore.get("vip_mode")?.value === "true";

  return <VipButton isVip={isVip} />;
};

export default VipButtonServer;
