import LoginForm from "@/components/auth/login-form";
import { ModeToggle } from "@/components/custom/ModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex justify-end">
        <ModeToggle />
      </header>

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <LoginForm />
      </main>
    </div>
  );
}
