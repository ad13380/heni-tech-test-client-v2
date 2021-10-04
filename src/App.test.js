import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import App from "./App";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");
// suppress logging during tests
console.log = jest.fn();

Enzyme.configure({ adapter: new Adapter() });

const waitForComponentToUpdate = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};
describe("<App />", () => {
  it("should on successful load render the prints and pagination components", async () => {
    axios.get.mockResolvedValueOnce({ data: { info: {}, records: [] } });
    const wrapper = mount(<App />);

    // Rendering "loading" spinner
    expect(wrapper.find("Spinner")).toHaveLength(1);

    await waitForComponentToUpdate(wrapper);

    expect(wrapper.find("Spinner")).toHaveLength(0);
    expect(wrapper.find("PrintsContainer")).toHaveLength(1);
    expect(wrapper.find("PaginationContainer")).toHaveLength(1);
  });

  it("should on unsuccessful load render an alert", async () => {
    axios.get.mockRejectedValueOnce(new Error());
    const wrapper = mount(<App />);

    await waitForComponentToUpdate(wrapper);

    expect(wrapper.find("Alert")).toHaveLength(1);
    expect(wrapper.find("PrintsContainer")).toHaveLength(0);
    expect(wrapper.find("PaginationContainer")).toHaveLength(0);
  });
});
