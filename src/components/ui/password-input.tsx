import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  register: any; // Tipagem simplificada para o exemplo
  name: string;
}

export function InputPassword({
  register,
  name,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-10" // Abre espaço para o ícone não sobrepor o texto
        {...register(name)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        tabIndex={-1} // Evita que o Tab pare no ícone antes de ir para o próximo campo
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" />
        )}
        <span className="sr-only">
          {showPassword ? "Esconder senha" : "Mostrar senha"}
        </span>
      </Button>
    </div>
  );
}
