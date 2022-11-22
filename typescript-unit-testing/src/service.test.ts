import { Printer, Service } from "./service";

describe("Service", () => {
  it("service can print", () => {
    // arrange
    const printerMock: Printer = {
      id: "",
      name: "",
      print() {},
      superOption: "",
    };

    jest.spyOn(printerMock, "print");

    const service = new Service(printerMock);

    // act
    service.print();

    // assert
    expect(printerMock.print).toHaveBeenCalled();
  });

  it("service can print in color", () => {
    // arrange
    const printerMock: Printer = {
      id: "",
      name: "",
      print() {},
      superOption: "",
      printInColor() {},
    };

    const service = new Service(printerMock);

    jest.spyOn(printerMock, "printInColor");

    // act
    service.print();

    // assert

    expect(printerMock.printInColor).toHaveBeenCalled();
  });
});
