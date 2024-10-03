
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Hero from "./components/frontend/Hero";

export default async function Home() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
     <Hero/>
    </div>
  );
}
