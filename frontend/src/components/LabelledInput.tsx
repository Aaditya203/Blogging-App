import { Eye, EyeOff , Loader2,
  CheckCircle2,
  XCircle, } from "lucide-react";
import { useState } from "react";

interface LabelledInputProps {
  label: string;
  placeholder: string;
  type?: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  status?:"idle" | "checking" | "available" | "taken";
  message?:string;
}

export function LabelledInput({
  label,
  placeholder,
  type = "text",
  onchange,
  status="idle",
  message=""
}: LabelledInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full mt-5">

      <label className="block text-sm font-semibold text-neutral-700 mb-2 font-inter">
        {label}
      </label>

      <div className="relative">

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          onChange={onchange}
          className={`
          w-full
          rounded-lg
          border
          ${
  status === "available"
    ? "border-green-500"

    : status === "taken"

    ? "border-red-500"

    : "border-neutral-300"
}
          bg-white
          px-4
          py-3
          pr-12
          outline-none
          transition-all
          duration-300
          focus:border-black
          focus:ring-4
          focus:ring-neutral-200
          placeholder:text-neutral-400
          font-inter
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-neutral-500
            hover:text-black
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
      {status !== "idle" && (
  <div
    className={`mt-2 flex items-center gap-2 text-sm font-inter ${
      status === "available"
        ? "text-green-600"
        : status === "taken"
        ? "text-red-600"
        : "text-neutral-500"
    }`}
  >
    {status === "checking" && (
      <Loader2 className="h-4 w-4 animate-spin" />
    )}

    {status === "available" && (
      <CheckCircle2 className="h-4 w-4" />
    )}

    {status === "taken" && (
      <XCircle className="h-4 w-4" />
    )}

    <span>
      {status === "checking"
        ? "Checking availability..."
        : message}
    </span>
  </div>
)}
    </div>
  );
}