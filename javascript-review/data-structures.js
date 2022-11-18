export function dataStructures() {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then(({ results }) => {
      //   console.log(results);

      results.forEach((character, index, array) => {
        // console.log(character, index);
      });

      const characterNames = results.map((character) => {
        return character.name;
      });

      const onlyAliveNames = results.filter(
        (character) => character.status === "Alive"
      );
      // .map(({ name }, index, array) => {
      //   console.log(array.length);
      //   return name;
      // });

      // find - pierwsz znaleziony element lub undefined
      // findIndex - index pierwszego znalezionego elementu lub -1

      // indexOf - index podanego elementu
      // flat
      // sort

      // every - zwraca boolean jeśli każdy element spełnia warunek funkcji
      // some - zwraca boolean jeśli przynajmniej jeden element spełnia warunek

      // includes

      /* 
        jak napisać swój polyfill?
        czyli implementacja np. metody, której nie wspiera dane środowisko
      */
      if (!window.structuredClone) {
        window.structuredClone = function () {};
      }

      const copy = structuredClone(onlyAliveNames); // deep copy
      const copy2 = JSON.parse(JSON.stringify(onlyAliveNames)); // deep copy bez przeniesienia metod z obiektu

      const copy3 = onlyAliveNames.map((character) => {
        return { ...character };
      }); // deep copy jesli elementy-obiekty nie mają w sobie zagnieżdzonych obiektów

      const shallowCopy1 = [...onlyAliveNames]; // shallow copy
      const shallowCopy2 = onlyAliveNames.slice(); // shallow copy

      copy[0].name = "hacker"; // przy shallow copy zagniezdzone obiekty mają tę samą referencje!

      onlyAliveNames[onlyAliveNames.length - 1]; // ostatni element tabeli
      onlyAliveNames.at(-1); // ostatni element tabeli, caniuse.com by sprawdzić możliwość użycia na różnych środowiskach

      console.log({ onlyAliveNames });
    });
}

/* 
  obiekt, czyli struktura danych klucz-wartość (klucz to string lub number)
  kluczem może być też Symbol, ale nie ma co teraz w to wnikać bo to przypadki brzegowe
*/
const person = {
  age: 30,
  name: "john",
  id: "b048517c-1395-4e1f-867d-f95d19d37812",
};

/*
  obiekt może być użyty do przetrzymywania kolekcji tych samych elementów
  indexy takiego obiektu to unikalne np. uuid właściwości elementu

  dzięki temu znajać id możemy od razu dostać się do elementu bez potrzeby wcześniejszego przeszukiwania w sposób iteracyjny
*/
const persons = {
  "b048517c-1395-4e1f-867d-f95d19d37812": {
    age: 30,
    name: "john",
  },
};

let id = "b048517c-1395-4e1f-867d-f95d19d37812";

persons[id]; // dostajemy się bezpośrednio do danego elementu znając jego id

// iteracyjne przeszukiwania obiektów za pomocą pętli for in
// i zamiana obiektu w tablicę
let personsAsArray = [];

for (let id in persons) {
  personsAsArray.push({
    ...persons[id],
    id,
  });
}

// iteracyjne przeszukiwania obiektów za metody Object.entries
const personsAsArray2 = Object.entries(persons).map((entry) => {
  console.log(entry);

  const [id, person] = entry;

  return {
    ...person,
    id,
  };
});

/*
  Klasy w JS -
  TODO - pola prywatne oraz dziedziczenie
*/
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const newPerson = new Person("nick", 40); // instance tworzymy zawsze ze slowem kluczowym new i wywolujemy funkcje constructora

function createPerson(name, age) {
  return {
    name,
    age,
  };
}

console.log(newPerson, createPerson("nick2", 24)); // sprawdź w consoli co dodatkowo wyświetla się przy drukowaniu instancji klasy Person
