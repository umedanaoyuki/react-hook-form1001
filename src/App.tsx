import { MyFormType, useMyForm } from "./use-my-form";
import { useState } from "react";

type DataType = {
  name: string;
  participantType: "timeTraveler" | "alien";
  year?: number;
  planetName?: string;
};

function App() {
  const [data, setData] = useState<DataType | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useMyForm();

  const participantType = watch("participantType");

  const onSubmit = (formData: MyFormType) => {
    const commonData = {
      name: formData.name,
      participantType: formData.participantType,
    };

    if (formData.participantType === "alien") {
      setData({
        ...commonData,
        planetName: formData.planetName,
      });
    } else {
      setData({
        ...commonData,
        year: formData.year,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">お名前は？</label>
        <input id="name" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <fieldset>
          <legend>参加者タイプ</legend>
          <input
            type="radio"
            {...register("participantType")}
            id="participantType_timeTraveler"
            value="timeTraveler"
          />
          <label htmlFor="participantType_timeTraveler">
            時間旅行者 - Time Traveler
          </label>
          <input
            type="radio"
            {...register("participantType")}
            id="participantType_alien"
            value="alien"
          />
          <label htmlFor="participantType_alien">エイリアン — Alien</label>
        </fieldset>

        {participantType === "timeTraveler" && (
          <>
            <label htmlFor="year">西暦何年から来ましたか？</label>
            <input
              id="year"
              type="number"
              {...register("year", { valueAsNumber: true })}
            />
            {errors.year && <span>{errors.year.message}</span>}
          </>
        )}

        {participantType === "alien" && (
          <>
            <label htmlFor="planetName">出身星の名前は?</label>
            <input id="planetName" {...register("planetName")} />
            {errors.planetName && <span>{errors.planetName.message}</span>}
          </>
        )}
        <button type="submit">登録</button>
      </form>
      {data && (
        <div>
          <div>名前: {data.name}</div>
          <div>参加者タイプ: {data.participantType}</div>
          <div>出身星: {data.planetName ?? "-"}</div>
          <div>年: {data.year ?? "-"}</div>
        </div>
      )}
    </>
  );
}

export default App;
