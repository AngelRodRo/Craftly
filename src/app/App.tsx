import { Provider } from "react-redux";
import { setupStore } from "./store";
import Router from "./router";

export default function App() {
  const store = setupStore();

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
