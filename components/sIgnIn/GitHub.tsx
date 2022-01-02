import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";

export function SignInWithGitHub() {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className="h-12 bg-neutral-700 text-white flex
      items-center justify-center p-4 rounded-full hover:brightness-90"
    >
      <FaGithub className="w-5 h-5 text-green-400" />
      <span className="ml-4">{session.user.name}</span>
      <FiX
        className="text-neutral-400 w-4 h-4 ml-2"
        onClick={() => signOut()}
      />
    </button>
  ) : (
    <button
      type="button"
      className="h-12 bg-neutral-700 text-white flex
    items-center justify-center p-4 rounded-full hover:brightness-90"
      onClick={() => signIn("github")}
    >
      <FaGithub className="w-5 h-5 text-orange-400" />
      <span className="ml-4">Sign in with GitHub</span>
    </button>
  );
}
