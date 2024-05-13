import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  CreateCountryFormValidator,
  createCountryFormValidator,
} from "@/libs/validators/createCountryFormValidator";
import { ADD_COUNTRY } from "@/libs/api/public/countries/mutations";
 
const HomeCountryAddForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CreateCountryFormValidator>({
    resolver: zodResolver(createCountryFormValidator),
    values: {
      name: "",
      emoji: "",
      code: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const [createCountry, { data }] = useMutation(ADD_COUNTRY);

  const onSubmit = (data: CreateCountryFormValidator) => {
    setIsLoading(true);

    toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          createCountry({
            variables: {
              data,
            },
          })
            .then(() => {
              if (data) {
                reset();
                setIsLoading(false);
                router.reload();
                resolve("Pays ajouté avec succès !");
              } else {
                setIsLoading(false);
                reject(
                  "Une erreur s'est produite lors de l'ajout du pays. Veuillez réessayer."
                );
              }
            })
            .catch((error) => {
              setIsLoading(false);
              reject(error);
            });
        }, 1000);
      }),
      {
        loading: "Ajout du pays en cours...",
        success: "Pays ajouté avec succès !",
        error:
          "Une erreur s'est produite lors de l'ajout du pays. Veuillez réessayer.",
      }
    );
  };

  return (
    <div className="collapse collapse-plus border border-base-300 bg-base-200 mb-10">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium uppercase">
        Ajouter un pays
      </div>
      <div className="collapse-content">
        <p className="mb-5 italic">
          Si vous souhaitez ajouter un pays, veuillez remplir le formulaire
          ci-dessous.
        </p>
        <form className="" onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="flex gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Nom ?</span>
                  </div>
                  <input
                    {...field}
                    type="text"
                    placeholder="Entrez le nom du pays"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.name && (
                    <div className="label">
                      <span className="label-text-alt text-error italic">
                        {errors.name.message}
                      </span>
                    </div>
                  )}
                </label>
              )}
            />

            <Controller
              name="emoji"
              control={control}
              render={({ field }) => (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Emoji ?</span>
                  </div>
                  <input
                    {...field}
                    type="text"
                    placeholder="Entrez l'emoji du pays"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.emoji && (
                    <div className="label">
                      <span className="label-text-alt text-error italic">
                        {errors.emoji.message}
                      </span>
                    </div>
                  )}
                </label>
              )}
            />

            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Code ?</span>
                  </div>
                  <input
                    {...field}
                    type="text"
                    placeholder="Entrez le code du pays"
                    className="input input-bordered w-full max-w-xs"
                  />
                  {errors.code && (
                    <div className="label">
                      <span className="label-text-alt text-error italic">
                        {errors.code.message}
                      </span>
                    </div>
                  )}
                </label>
              )}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-5 w-full"
          >
            {isLoading && <span className="loading loading-spinner"></span>}
            Ajouter le pays
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeCountryAddForm;
