export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9]+)*(\.[a-z]{2,15})/,
      message: "Formato de email incorrecto",
    },
    minLength(value) {
      return {
        value: value,
        message: "Mínimo 6 carácteres",
      };
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) return "No seas mala gente, escribe algo";
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};
