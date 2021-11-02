// const ErrorCodes = {
//   "1",
//   "666",
//   "400",
//   "401",
//   "17",
//   "9",
//   "5",
//   "69",
//   "3",
//   "233",
//  } as const;

export enum ERR_SEVERITY {
  FATAL = "FATAL",
  NORMAL = "NORMAL",
  WARNING = "WARNING",
}

const Errors = [
  {
    code: "1",
    message: "O usuário não existe",
    name: "USER_NOT_FOUND",
    status: 404,
  },
  {
    code: "404",
    message: "Entidade requisitada não existe",
    name: "NOT_FOUND",
    status: 404,
  },
  {
    code: "400",
    message: "Requisição inválida",
    name: "INVALID_REQUEST",
    status: 400,
  },
  {
    code: "17",
    message: "Usuário já existe",
    name: "USER_ALREADY_EXISTS",
    status: 401,
  },
  {
    code: "9",
    message: "Senha incorreta",
    name: "INCORRECT_PASSWORD",
    status: 401,
  },
  {
    code: "5",
    message: "Falha de autenticação. Token inválido.",
    name: "INVALID_TOKEN",
    status: 401,
  },
  {
    code: "69",
    message: "Nível de permissão insuficiente",
    name: "INSUFFICIENT_PERMISSION",
    status: 401,
  },
  {
    code: "3",
    message: "Paramêtro inválido",
    name: "INVALID_PARAM",
    status: 400,
  },
  {
    code: "233",
    name: "NO_DELETE_SELF",
    message: "Você não pode apagar a própria conta. Contate o administrador de sistema",
    status: 400,
  },
  {
    code: "456",
    name: "INVALID_SCHEMA",
    message: "Um esquema inválido foi enviado",
    status: 400,
  },
  {
    code: "455",
    name: "TOKEN_EXPIRED",
    message: "A sua chave de autenticação expirou",
    status: 400,
  },
  {
    code: "401",
    name: "UNAUTHORIZED",
    message: "Usuário não autorizado",
    status: 400,
  },
  {
    code: "406",
    name: "INVALID_ID",
    message: "ID inválido",
    status: 406,
  },
  {
    code: "42",
    name: "CLOUDNARY_ERROR",
    message: "Erro no cloudnary",
    status: 401,
  },
  {
    code: "403",
    name: "EMAIL_OR_PASSWORD_INCORRECT",
    message: "Email ou senha incorreto",
    status: 400
  },
  {
    code: "666",
    isArtsyError: false,
    message: "Ocorreu um erro no servidor",
    name: "SERVER_ERROR",
    status: 500,
  },
  {
    code: "23503",
    isArtsyError: true,
    message: "A entidade não pode ser deletada pois é referenciada em outra tabela",
    name: "WOULD_DELETE_REFERENCE",
    status: 400,
    severity: ERR_SEVERITY.FATAL,
  },
] as const;

export interface IArtsy_ERROR {
  isArtsyError?: boolean;
  code: typeof Errors[number]["code"];
  name: typeof Errors[number]["name"];
  message: string;
  status: number;
  severity: ERR_SEVERITY;
}

export const CodeErrorMap = Object.fromEntries(Errors.map((err) => [err.code, { ...err, isArtsyError: true }])) as Record<
  IArtsy_ERROR["code"],
  IArtsy_ERROR
>;

export const NamedErrorMap = Object.fromEntries(Errors.map((err) => [err.name, { ...err, isArtsyError: true }])) as Record<
  IArtsy_ERROR["name"],
  IArtsy_ERROR
>;

const errorKeys = ["name", "code"] as const;

export class ARTSY_ERROR<K extends typeof errorKeys[number] = "name"> implements IArtsy_ERROR {
  isArtsyError: boolean;
  code: IArtsy_ERROR["code"];
  name: IArtsy_ERROR["name"];
  message: string;
  status: number;
  severity: ERR_SEVERITY;

  constructor(e: K extends "name" ? IArtsy_ERROR["name"] : IArtsy_ERROR["code"], msg?: string) {
    this.severity = ERR_SEVERITY.NORMAL;
    let errObj = {};
    const n = Number(e);

    if (Number.isNaN(n)) {
      errObj = NamedErrorMap[e as IArtsy_ERROR["name"]];
    } else {
      errObj = CodeErrorMap[e as IArtsy_ERROR["code"]];
    }

    Object.assign(this, errObj);
    if (msg) {
      this.message = msg;
    }
  }
}
