import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import PaginationContainer from "./PaginationContainer";
Enzyme.configure({ adapter: new Adapter() });

describe("<PaginationGroup />", () => {
  it("should render no more page buttons than the total number of pages", () => {
    const wrapper = shallow(
      <PaginationContainer currentPage={2} totalPages={3} />
    );
    const expectedButtons = [
      "<First />",
      "<Prev />",
      "1",
      "2",
      "3",
      "<Next />",
      "<Last />",
    ];

    wrapper
      .find('[data-test="pagination-component"]')
      .children()
      .forEach((node, idx) => {
        expect(node.text()).toBe(expectedButtons[idx]);
      });
  });

  it("should not display back navigation buttons if the current page is the first", () => {
    const wrapper = shallow(
      <PaginationContainer currentPage={1} totalPages={7} />
    );
    const expectedButtons = ["1", "2", "3", "4", "5", "<Next />", "<Last />"];

    wrapper
      .find('[data-test="pagination-component"]')
      .children()
      .forEach((node, idx) => {
        expect(node.text()).toBe(expectedButtons[idx]);
      });
  });

  it("should not display forward navigation buttons if the current page is the last", () => {
    const wrapper = shallow(
      <PaginationContainer currentPage={7} totalPages={7} />
    );
    const expectedButtons = ["<First />", "<Prev />", "3", "4", "5", "6", "7"];

    wrapper
      .find('[data-test="pagination-component"]')
      .children()
      .forEach((node, idx) => {
        expect(node.text()).toBe(expectedButtons[idx]);
      });
  });

  it("should position the currrent page as the central button when possible", () => {
    const wrapper = shallow(
      <PaginationContainer currentPage={4} totalPages={7} />
    );
    const expectedButtons = [
      "<First />",
      "<Prev />",
      "2",
      "3",
      "4",
      "5",
      "6",
      "<Next />",
      "<Last />",
    ];

    wrapper
      .find('[data-test="pagination-component"]')
      .children()
      .forEach((node, idx) => {
        expect(node.text()).toBe(expectedButtons[idx]);
      });
  });
});
