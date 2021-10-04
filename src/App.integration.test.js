import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";
import App from "./App";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { when } from "jest-when";

jest.mock("axios");

Enzyme.configure({ adapter: new Adapter() });

const waitForComponentToUpdate = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

const createMockApiResponse = (pageNumber) => {
  const res = { data: { info: { pages: 100 }, records: [] } };
  for (let i = (pageNumber - 1) * 10 + 1; i <= 10 * pageNumber; i++) {
    res.data.records.push({
      id: i,
      title: `Print title ${i}`,
      dated: `${i}/1/1970`,
      description: `Description for print ${i}`,
      primaryimageurl: `image.com/${i}`,
      people: [{ role: "Artist", name: `Name of artist for print ${i}` }],
    });
  }
  return res;
};

const dataPageOne = createMockApiResponse(1);
const dataPageTwo = createMockApiResponse(2);

describe("when prints are successfully rendered on a page", () => {
  beforeEach(() => {
    when(axios.get)
      .calledWith("/api/prints", {
        baseURL: "https://heni-stealth.herokuapp.com",
        params: {
          page: 1,
        },
        headers: { "content-type": "application/json" },
      })
      .mockResolvedValue(dataPageOne);
    when(axios.get)
      .calledWith("/api/prints", {
        baseURL: "https://heni-stealth.herokuapp.com",
        headers: { "content-type": "application/json" },
        params: { page: 2 },
      })
      .mockResolvedValue(dataPageTwo);
  });

  it("should be able to click on a print card to view the print modal and click again to close it", async () => {
    const wrapper = mount(<App />);
    await waitForComponentToUpdate(wrapper);

    // modals should not be showing
    const printSevenCard = wrapper
      .find('[data-test="print-component-7"]')
      .find("Card");
    const printSevenModal = wrapper
      .find('[data-test="print-component-7"]')
      .find('[data-test="modal-component"]');
    expect(printSevenModal.prop("show")).toBeFalsy();

    // click on a print card
    printSevenCard.simulate("click");
    await waitForComponentToUpdate(wrapper);

    // modal for that print should be showing
    const updatedModalContainer = wrapper
      .find('[data-test="print-component-7"]')
      .find('[data-test="modal-component"]')
      .findWhere((n) => n.prop("show"))
      .first();
    expect(updatedModalContainer.prop("show")).toBeTruthy();

    // click on same print card
    printSevenCard.simulate("click");

    // modal for that print should not be showing
    await waitForComponentToUpdate(wrapper);
    expect(printSevenModal.prop("show")).toBeFalsy();
  });

  it("should be able to click on a page button and view data for that page", async () => {
    const wrapper = mount(<App />);
    await waitForComponentToUpdate(wrapper);

    // expect only page 1 data to be rendered
    const printSeven = wrapper.find('[data-test="print-component-7"]');
    const printTwelve = wrapper.find('[data-test="print-component-12"]');
    expect(printSeven).toHaveLength(1);
    expect(printTwelve).toHaveLength(0);

    // click on page 2 button
    const pageTwoButton = wrapper
      .find("PaginationContainer")
      .findWhere((n) => n.text() === "2")
      .find("a");
    pageTwoButton.simulate("click");
    await waitForComponentToUpdate(wrapper);

    // expect only page 2 data to be rendered
    const printSevenUpdated = wrapper.find('[data-test="print-component-7"]');
    const printTwelveUpdated = wrapper.find('[data-test="print-component-12"]');
    expect(printSevenUpdated).toHaveLength(0);
    expect(printTwelveUpdated).toHaveLength(1);
  });
});
