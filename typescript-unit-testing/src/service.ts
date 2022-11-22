export interface Printer {
  id: string;
  name: string;
  superOption: string;
  print(): void;
  printInColor?(): void;
}

const ricohPrinter: Printer = {
  id: "f3f03990-11e0-4c85-bd08-4af2e2af0c69",
  name: "ricoh",
  superOption: "blabla",
  print() {
    console.log("ricoh drukuje!");
  },
};

export class Service {
  constructor(private printer: Printer) {}

  print() {
    // implementacja
    if (this.printer.printInColor) {
      this.printer.printInColor();
    } else {
      this.printer.print();
    }
  }
}

// const hpPrinter: Printer = {
//   id: "f3f03990-11e0-4c85-bd08-32436344",
//   name: "hp",
//   superOption: "aaaa",
//   print() {
//     console.log("hp drukuje!");
//   },
// };

const service = new Service(ricohPrinter);

service.print();
