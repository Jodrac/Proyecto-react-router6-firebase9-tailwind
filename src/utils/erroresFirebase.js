export const erroresFirebase = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Usuario ya registrado";
    case "auth/invalid-email":
      return "Formato email no valido";
    case "auth/user-not-found":
      return "Usuario no registrado";
    case "auth/wrong-password":
      return "Contraseña incorrecta";
    default:
      return "Ha ocurrido un error en el servidor";
  }
};
// Para añadir más errores https://firebase.google.com/docs/auth/admin/errors?hl=es-419
