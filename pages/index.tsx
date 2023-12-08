import { useUser } from "@/lib/user";
import { Button } from "@mantine/core";

export default function Page() {
  const { user, loggedIn } = useUser();

  return (
    <main className="p-4">
      Cyber world!
      <Button>Click me</Button>
      {loggedIn && (
        <p>
          Logged in as {user?.id} {user?.first_name} {user?.last_name}
          {user?.login}
        </p>
      )}
    </main>
  );
}
