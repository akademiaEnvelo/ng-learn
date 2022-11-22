import "./style.css";

// https://rickandmortyapi.com/api/character

export function sum(a: number, b: number): number {
  return a + b;
}

let a: any = "ada";

a = 5;

a = {};

// number

let numb1 = 5;
numb1 = 1000.5345;

let numb2 = 5.5;

numb2 = sum(100, 100);

// string

let str = "";

// boolean

// null

// undefined

// type ApiResponse = {info: any, results: any};

// type ApiResponse = {total: number};

interface ApiResponseInfo {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

interface Character {
  id: number;
  created: string;
  image: string;
  name: string;
}

interface Location {
  id: number;
  created: number;
  name: string;
  type: string;
}

interface Episode {
  id: number;
}

interface ApiResponse {
  info: ApiResponseInfo;
  results: (Character | Location)[];
}

// interface ApiResponseLocation {
//   info: ApiResponseInfo;
//   results: Location[];
// }

// interface ApiResponseEpisode {
//   info: ApiResponseInfo;
//   results: Episode[];
// }

// interface ApiResponseCharacter {
//   info: ApiResponseInfo;
//   results: Character[];
// }

interface GenericApiResponse<T, K = any, X = any> {
  info: ApiResponseInfo;
  results: T[];
}

// nice to have (6 weeks)
function compare<T extends { id: number }>(obj: T, obj2: T) {
  return obj.id === obj2.id;
}

compare<number>(100, 100);

compare({ id: 100 }, "ada");

// interface ApiResponse2 {
//   total: number;
//   // getCount: () => number;
//   getCount(): number;
//   getNothing(): void;
// }

// type CustomVoidFunction = () => void;

// declare let stringOrNumber: string | null;

// if (typeof stringOrNumber === "string") {
//   // stringOrNumber.
//   // stringOrNumber.
// } else {
//   stringOrNumber;
// }

interface CustomVoidFunction {
  (): void;
}

// type guard example
function isLocation(x: any): x is Location {
  return x.type;
}

// sum(100, 200);

fetch("https://rickandmortyapi.com/api/character?page=42")
  .then((res) => res.json())
  .then((response: ApiResponse) => {
    response.results.forEach((character) => {
      if (isLocation(character)) {
        // tutaj Location
      } else {
        // tutaj Character
      }
    });
  });

fetch("https://rickandmortyapi.com/api/location")
  .then((res) => res.json())
  .then((response: GenericApiResponse<Location>) => {
    console.log(response);
    response.results.forEach((location) => {});
  });

type Values = 100 | 200 | 300;

type Roles = "ADMIN" | "USER" | "VISITOR";

let numb3: Values = 100;

const numb4 = 5;

let adminRole: Roles = "ADMIN";

function getDashboard(role: Roles) {}

getDashboard("MENTOR");

interface User {
  uuid: string;
}

class Person {
  constructor(
    public readonly name: string,
    private age: number,
    protected hasSomething: boolean
  ) {}

  getAge() {
    this.prepareMessage();
    return this.age > 20 ? "nie ma takiej informacji" : this.age;
  }

  private prepareMessage() {}
}

class Developer extends Person {
  constructor(public name: string, age: number) {
    super(name, age, true);
  }
}

function getPermissions(user: Person) {}

const ryan = new Person("ryan", 30, true);

const dev = new Developer("jack", 100);

abstract class Animal {
  abstract say(): void;

  setName() {}

  abstract run() {}
}

class Dog extends Animal {
  say() {
    console.log("i am a dog");
  }
  run() {}
}

class Cat extends Animal {
  say() {
    console.log("i am a cat");
  }

  miau() {}

  run() {}
}

class Fish extends Animal {
  say() {
    console.log("i am a fish");
  }

  run() {}
}

abstract class AppUser {
  abstract role: string;
  abstract login(): Promise<void>;
}

abstract class X extends AppUser {}

class Admin extends AppUser {
  role = "ADMIN";

  login() {
    // logika admina

    return Promise.resolve();
  }
}

class Mentor extends AppUser {
  role = "MENTOR";

  login() {
    // logika admina

    return Promise.resolve();
  }
}

function login(user: AppUser) {
  user.login().then(() => alert("zalogowano"));
}

function letAnimalTalk(animal: Animal) {
  animal.say();
}

letAnimalTalk(new Cat());
letAnimalTalk(new Dog());

// const VAT = 1.23
//netto * VAT

interface Bird {
  fly(): void;
}

interface Eagle extends Bird {
  hunt(): void;
}

type Bird2 = {
  fly(): void;
};

type Eagle2 = Bird2 & { isPredator: boolean } & {
  hunt(): void;
};

const eagle = {} as Eagle2;
