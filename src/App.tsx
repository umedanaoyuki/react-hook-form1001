import { MyFormType, useMyForm } from "./use-my-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useMyForm();

  const participantType = watch("participantType");

  const onSubmit = (data: MyFormType) => {
    console.log(data);
  };

  return (
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
  );
}

export default App;
