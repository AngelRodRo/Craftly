import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
// @ts-expect-error - Node's TextDecoder is compatible enough for testing purposes
global.TextDecoder = TextDecoder;

// Mock scrollIntoView for Radix UI components
Element.prototype.scrollIntoView = jest.fn();

import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

import { setupStore } from "@/app/store";
import type { AppStore, RootState } from "@/app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
