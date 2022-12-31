import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import { act } from 'react-dom/test-utils';
import Register from './pages/Register';

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};

test('App should always render ', () => {
  render(
    <App />
  )
});

test('Link to go to the Register page must be present', () => {
  render(
    <Login />, { wrapper: BrowserRouter }
  )
  const linkElement = screen.getByText(/Click here to Register/i);
  expect(linkElement).toBeInTheDocument();

});

test('Username and Password fiels must be present in the Login Page', async () => {
  render(
    <Login />, { wrapper: BrowserRouter }
  )
  const username = screen.getByText(/Username/i);
  const password = screen.getByText(/Password/i);
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();

});



test('Only one button is  present', async () => {
  render(
    <Login />, { wrapper: BrowserRouter }
  )
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
});

test('password input field should have type password', () => {
  render(
    <Login />, { wrapper: BrowserRouter }
  )
  const password = screen.getByPlaceholderText("Password");

  expect(password).toHaveAttribute("type", "password");
});

test('car image should be there in Login Page', () => {
  render(
    <Login />, { wrapper: BrowserRouter }
  )
  const displayedImage = document.querySelector("img");
  expect(displayedImage.src).toContain("https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80");
})

test('Success message after pressing login button', async () => {
  const { getByTestId } = await act(() => render(<Login />, { wrapper: BrowserRouter }))
  const loginBtn = getByTestId("logbut");
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(username, { target: { value: 'vipul' } })
  fireEvent.change(password, { target: { value: 'vipul' } })
  await act(() => fireEvent.click(loginBtn));
  const success = screen.getByText(/Login success/i);
  expect(success).toBeInTheDocument();
});

test('in Register page password and confirm password must be same', async () => {
  const { getByTestId } = await act(() => render(<Register />, { wrapper: BrowserRouter }))
  const loginBtn = getByTestId("reg");
  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const cpassword = screen.getByPlaceholderText("Confirm Password");
  fireEvent.change(username, { target: { value: 'vipul11' } })
  fireEvent.change(password, { target: { value: '123456' } })
  fireEvent.change(cpassword, { target: { value: '123456' } })
  await act(() => fireEvent.click(loginBtn));
  const success = screen.getByText(/Registraction successfull/i);
  expect(success).toBeInTheDocument();
});

