import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  return (
    <section>
      {user ? (
        <>
          <LogoutLink><button className="w-full text-black">
          Log out
            </button></LogoutLink>
        </>
      ) : (<>
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
      </>
      )}
    </section>
  );
}
