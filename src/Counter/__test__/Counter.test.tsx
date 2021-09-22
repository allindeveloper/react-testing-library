import React from "react";
import Counter from "../Counter";
import { render, fireEvent, cleanup} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect" // not compulsory

let getByTestId: any;
beforeEach(()=>{
  const component  = render(<Counter />)
  getByTestId = component.getByTestId

  //  you can add logic here to login before doing anything
})
afterEach(()=>{

  cleanup()
  // clean up all of the virtual dom
  // this gets specified by default in react
})
test("header renders with correct text", () => {

  const headerElement = getByTestId('header')

  expect(headerElement.textContent).toBe('My Counter')

})

test('counter initially start with text of 0', () => {
  // const { getByTestId } = render(<Counter />);
  const counterElement = getByTestId('counter');

  expect(counterElement.textContent).toBe('0');
})

test('input contains initial value of 1', () => {
  // const { getByTestId } = render(<Counter />);
  const inputElement = getByTestId('input') as HTMLInputElement;

  expect(inputElement.value).toBe("1")
})

test('add button renders with + sign', () => {
  // const { getByTestId } = render(<Counter />);
  const addBtn = getByTestId('add-btn') as HTMLButtonElement;

  expect(addBtn.textContent).toBe("+")
})

test('subtract button renders with - sign', () => {
  // const { getByTestId } = render(<Counter />);
  const subtractBtn = getByTestId('subtract-btn') as HTMLButtonElement;

  expect(subtractBtn.textContent).toBe("-")
})

test('change value of input works correctly', () => {
  // const { getByTestId } = render(<Counter />);
  const inputElement = getByTestId('input') as HTMLInputElement;
  expect(inputElement.value).toBe("1")

  fireEvent.change(inputElement, {
    target: {
      value: "5"
    }
  })

  expect(inputElement.value).toBe("5")
})

test('click on plus btn adds 1 to counter', () => {
  // const { getByTestId } = render(<Counter />);
  const addbtnElement = getByTestId('add-btn');
  const counterElement = getByTestId('counter') as HTMLInputElement;

  expect(counterElement.textContent).toBe("0")

  fireEvent.click(addbtnElement);
  // after clicking the button, what do we expect?

  expect(counterElement.textContent).toBe("1")
  // expect(counterElement.value).toBe(counterElement.value+1)

})

test('click on subtract btn subtract 1 to counter', () => {
  // const { getByTestId } = render(<Counter />);
  const subtractbtnElement = getByTestId('subtract-btn');
  const counterElement = getByTestId('counter') as HTMLInputElement;

  expect(counterElement.textContent).toBe("0")

  fireEvent.click(subtractbtnElement);
  // after clicking the button, what do we expect?

  expect(counterElement.textContent).toBe("-1")
  // expect(counterElement.value).toBe(counterElement.value+1

})

test('changing input value then clicking on add button works correctly', () => {
  // const { getByTestId } = render(<Counter />);
  const addbtnElement = getByTestId('add-btn');
  const counterElement = getByTestId('counter') as HTMLInputElement;
  const inputElement = getByTestId('input') as HTMLInputElement;


  fireEvent.change(inputElement, {
    target: {
      value: "5"
    }
  });
  fireEvent.click(addbtnElement)

  expect(counterElement.textContent).toBe("5")

})


test('changing input value then clicking on subtract button works correctly', () => {
  // const { getByTestId } = render(<Counter />);
  const subtractbtnElement = getByTestId('subtract-btn');
  const counterElement = getByTestId('counter') as HTMLInputElement;
  const inputElement = getByTestId('input') as HTMLInputElement;


  fireEvent.change(inputElement, {
    target: {
      value: "5"
    }
  });
  fireEvent.click(subtractbtnElement)

  expect(counterElement.textContent).toBe("-5")

})

test('adding and then subtracting leads to the correc counter number', () => {
  // const { getByTestId } = render(<Counter />);
  const subtractbtnElement = getByTestId('subtract-btn');
  const addbtnElement = getByTestId('add-btn');
  const counterElement = getByTestId('counter') as HTMLInputElement;
  const inputElement = getByTestId('input') as HTMLInputElement;

  fireEvent.change(inputElement, {
    target: {
      value: "10"
    }
  })
  fireEvent.click(addbtnElement)
  fireEvent.click(addbtnElement)
  fireEvent.click(addbtnElement)
  fireEvent.click(addbtnElement)
  fireEvent.click(subtractbtnElement)
  fireEvent.click(subtractbtnElement)

  expect(counterElement.textContent).toBe("20")

  fireEvent.change(inputElement, {
    target: {
      value: "5"
    }
  })
  fireEvent.click(addbtnElement)
  fireEvent.click(subtractbtnElement)
  fireEvent.click(subtractbtnElement)

  expect(counterElement.textContent).toBe("15")


})

test('counter contains correct className',()=>{
  // const { getByTestId } = render(<Counter />);
  const counterElement = getByTestId('counter');
  const inputElement = getByTestId('input') as HTMLInputElement;
  const subtractbtnElement = getByTestId('subtract-btn');
  const addbtnElement = getByTestId('add-btn');

  expect(counterElement.className).toBe("")
  fireEvent.change(inputElement, {
    target: {
      value: "50"
    }
  })
  fireEvent.click(addbtnElement) // + 50
  // since input value is not less than 100 or above 100, then the classname should still be empty
  expect(counterElement.className).toBe("")

  fireEvent.click(addbtnElement) // now we're at 100

  expect(counterElement.className).toBe("green");

  fireEvent.click(addbtnElement)

  expect(counterElement.className).toBe("green");


  fireEvent.click(subtractbtnElement)
  fireEvent.click(subtractbtnElement)// at 50

  expect(counterElement.className).toBe("");

  fireEvent.click(subtractbtnElement)
  fireEvent.click(subtractbtnElement)
  fireEvent.click(subtractbtnElement)
  fireEvent.click(subtractbtnElement) 

  expect(counterElement.className).toBe("red");


})