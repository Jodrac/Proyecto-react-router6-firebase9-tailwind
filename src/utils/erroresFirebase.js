export const erroresFirebase = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "Usuario ya registrado",
      };
    case "auth/invalid-email":
      return {
        code: "email",
        message: "Formato email no valido",
      };
    case "auth/user-not-found":
      return {
        code: "email",
        message: "Usuario no registrado",
      };
    case "auth/wrong-password":
      return {
        code: "password",
        message: "Contraseña incorrecta",
      };
    default:
      return {
        code: "email",
        message: "Ocurrio un error en el servidor",
      };
  }
};
// Para añadir más errores https://firebase.google.com/docs/auth/admin/errors?hl=es-419
