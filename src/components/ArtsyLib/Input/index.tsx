import React, { LegacyRef, ReactNode, useRef, useState } from "react";

import {
  SearchInput,
  TextArea,
  NormalInput,
  PasswordInput,
  VisibleEye,
  HiddenEye,
} from "./styles";
import { InputProps } from "./type";

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { iconRight?: ReactNode }
>(({ iconRight, ...props }, ref) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "1px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  function handleShowPassword() {
    setIsPasswordHidden(!isPasswordHidden);
  }

  switch (props.customtype) {
    case "search":
      return (
        <SearchInput>
          <input ref={ref as LegacyRef<HTMLInputElement>} {...props} />

          <div className="iconRight">{iconRight}</div>
        </SearchInput>
      );

    case "textArea":
      return (
        <TextArea
          {...props}
          ref={textAreaRef as React.Ref<HTMLTextAreaElement>}
          onInput={handleResize}
        />
      );

    case "normalText":
      return (
        <NormalInput {...props} ref={ref as React.Ref<HTMLInputElement>} />
      );

    case "password":
      return (
        <PasswordInput>
          <input
            {...props}
            ref={ref as React.Ref<HTMLInputElement>}
            type={isPasswordHidden ? "password" : "text"}
          />

          <button type="button" onClick={handleShowPassword} className="icon">
            {isPasswordHidden ? <VisibleEye /> : <HiddenEye />}
          </button>
        </PasswordInput>
      );

    default:
      throw new Error("Input must have a customType");
  }
});
