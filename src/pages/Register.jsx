import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message: message,
      });
    }
  };

  return (
    <>
      <Title text="Register" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        ></FormInput>
        <FormError error={errors.email} />

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("password", {
            minLength: minLength(6),
            validate: validateTrim,
          })}
          label="Ingresa tu contraseña"
          error={errors.password}
        ></FormInput>
        <FormError error={errors.password} />

        <FormInput
          type="password"
          placeholder="Ingrese contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repita la contraseña"
          error={errors.repassword}
        ></FormInput>
        <FormError error={errors.repassword} />

        <Button text="Registrar" type="submit"></Button>
      </form>
    </>
  );
};

export default Register;
