"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input {...props} ref={ref} type={showPassword ? "text" : "password"} />
      <Button
        className="absolute right-0 top-0 z-50 h-full px-3 flex items-center text-white"
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        variant="eyeBtn"
      >
        {showPassword ? (
          <FaRegEyeSlash enableBackground={"false"} className="text-white" />
        ) : (
          <FaRegEye enableBackground={"false"} className="text-white" />
        )}
      </Button>
    </div>
  );
});

export default PasswordInput;
