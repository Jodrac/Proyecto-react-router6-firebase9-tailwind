import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";

import Title from "../components/Title";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternURL } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message: message,
      });
    }
  };
  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };
  const handleClickEdit = async (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };
  const handleClickCopy = async (nanoid) => {
    setCopy(false);
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy({ [nanoid]: true });
  };

  const pathURL = window.location.href;
  return (
    <>
      <Title text="HOME" />
      <p className="text-center">Web con host y BD en firebase</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="https://www.google.es"
          {...register("url", {
            required: required,
            pattern: patternURL,
          })}
          label="Ingresa URL"
          error={errors.url}
        ></FormInput>
        <FormError error={errors.url} />

        {newOriginID ? (
          <Button
            type="submit"
            text="Edit URL"
            color="yellow"
            loading={loading.updateData}
          ></Button>
        ) : (
          <Button
            type="submit"
            text="ADD URL"
            color="blue"
            loading={loading.addData}
          ></Button>
        )}
      </form>
      {data.map((item) => (
        <div
          key={item.nanoid}
          className="mb-2 p-6 bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className="flex space-x-3">
            <Button
              type="button"
              text="Delete"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            ></Button>
            <Button
              type="button"
              text="Edit"
              color="yellow"
              onClick={() => handleClickEdit(item)}
            ></Button>
            <Button
              type="button"
              text={copy[item.nanoid] ? "Copied" : "Copy"}
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            ></Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
