import {CookiesProvider} from "react-cookie"
import { Provider } from "react-redux";
import "./App.css"
import { store } from "../reducers/store"
import HomeLayout from "./components/HomeLayout";
import { LoginProvider } from "./providers/LoginProvider";
import { DarkThemeProvider } from "./providers/DarkTheme";
export default function App() {
  return (
    <>
      <CookiesProvider>
        <LoginProvider>
          <DarkThemeProvider>
            <Provider store={store}>
              <HomeLayout/>
            </Provider>
          </DarkThemeProvider>
        </LoginProvider>
      </CookiesProvider>
    </>
  )
}