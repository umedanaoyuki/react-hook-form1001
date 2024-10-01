import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const myFormSchema = yup.object().shape({
  name: yup.string().required("お名前を入力してください。"),
  participantType: yup.string().oneOf(["timeTraveler", "alien"]).required(),
  year: yup.number().when("participantType", {
    is: (val: string) => val == "timeTraveler",
    then: (schema) =>
      schema.required().min(2025, "2025年以降を入力してください"),
    otherwise: (schema) => schema.notRequired(),
  }),
  planetName: yup.string().when("participantType", {
    is: (val: string) => val == "alien",
    then: (schema) =>
      schema.required().matches(/星|座/, "星か星座の名前を入力してください。"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export type MyFormType = yup.InferType<typeof myFormSchema>;

export const useMyForm = () => {
  return useForm<MyFormType>({
    resolver: yupResolver(myFormSchema),
    defaultValues: {
      name: "",
      participantType: "alien",
      year: undefined,
      planetName: undefined,
    },
  });
};
