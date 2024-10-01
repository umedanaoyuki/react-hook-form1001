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
      console.log(data);
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
        <label htmlFor="">お名前は？</label>
        <input type="" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="">参加者タイプ</label>
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

        {participantType === "timeTraveler" && (
          <>
            <label>西暦何年から来ましたか？</label>
            <input {...register("year")} />
            {errors.year && <span>{errors.year.message}</span>}
          </>
        )}

        {participantType === "alien" && (
          <>
            <label htmlFor="">出身星の名前は?</label>
            <input {...register("planetName")} />
            {errors.planetName && <span>{errors.planetName.message}</span>}
          </>
        )}
        <button type="submit">登録</button>
      </form>
      {data && (
        <div>
          <div className="">名前: {data.name}</div>
          <div className="">参加者タイプ: {data.participantType}</div>
          <div className="">
            出身星: {data.planetName ? data.planetName : "-"}
          </div>
          <div>年: {data.year ? data.year : "-"}</div>
        </div>
      )}
    </>
  );
}

export default App;
