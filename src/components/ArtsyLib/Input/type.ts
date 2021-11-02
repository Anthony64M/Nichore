export interface SearchInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  customtype: "search";
}

export interface TextareaInputProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  customtype: "textArea";
}

export interface NormalInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  customtype: "normalText";
}

export interface PasswordInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  customtype: "password";
}

export type InputProps =
  | SearchInputProps
  | TextareaInputProps
  | NormalInputProps
  | PasswordInputProps;
