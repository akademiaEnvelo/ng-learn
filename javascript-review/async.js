export async function asyncJS() {
  // asynchroniczne są promisy w tym zapytania do API
  let loading = false;

  loading = true;

  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((apiResponse) => {
      // loading = false;
      // console.log(apiResponse);
    })
    .catch((err) => {
      // loading = false;
      console.log(err);
    })
    .then(() => {})
    .finally(() => {
      loading = false;
    });

  await fetch("https://rickandmortyapi.com/api/location"); // top-level await

  try {
    await Promise.reject();
  } catch (error) {
    // console.log("błąd w try-catch");
  } finally {
  }

  /*
    Jeśli przynajmniej jeden promisów rzuci błędem, Promise.all rzuci błąd
  */
  // Promise.all([Promise.resolve(2), Promise.resolve(1)]).then((results) => {
  //   // 2 ,1
  // });

  /*
    Niezaleznie od wyniku promisów, zwraca nam wszystkie wyniki razem z ich stanem
  */
  // Promise.allSettled([Promise.resolve(2), Promise.reject(new Error())]).then(
  //   console.log
  // );

  // timery są asynchroniczne
  // setTimeout jako interval
  let counter = 0;

  let timeout = createTimeout();

  function createTimeout() {
    return setTimeout(() => {
      counter++;

      if (counter === 10) {
        return;
      }

      timeout = createTimeout();
    }, 1000);
  }

  // eventy są asynchorniczne
  document.body.addEventListener("click", () => {});
}
