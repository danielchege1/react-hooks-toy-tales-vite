import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "../components/App";

describe("product management", () => {
  it("filters products as the search query changes", async () => {
    global.setFetchResponse(global.baseToys);
    const { getByRole, getByLabelText, findByText, queryByText } = render(
      <App />,
    );

    fireEvent.click(getByRole("link", { name: "Products" }));
    expect(await findByText("Woody")).toBeInTheDocument();

    fireEvent.change(getByLabelText("Search products"), {
      target: { value: "buzz" },
    });

    expect(await findByText("Buzz Lightyear")).toBeInTheDocument();
    await waitFor(() => expect(queryByText("Woody")).not.toBeInTheDocument());
  });

  it("patches product details, including price, from the product page", async () => {
    global.setFetchResponse(global.baseToys);
    const { getByRole, getByLabelText, findByRole } = render(<App />);

    fireEvent.click(getByRole("link", { name: "Products" }));
    fireEvent.click(await findByRole("link", { name: "Woody" }));
    fireEvent.change(getByLabelText("Price (USD)"), {
      target: { value: "24.5" },
    });

    const updatedToy = { ...global.baseToys[0], price: 24.5 };
    global.setFetchResponse(updatedToy);
    fireEvent.click(getByRole("button", { name: "Save changes" }));

    await findByRole("heading", { name: "Products" });
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/toys/1",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ name: "Woody", image: updatedToy.image, price: 24.5, description: "" }),
      }),
    );
  });
});
