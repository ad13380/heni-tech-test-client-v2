import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import PrintsContainer from "./PrintsContainer";
Enzyme.configure({ adapter: new Adapter() });

describe("<PrintsContainer />", () => {
  it("should render a print component for each print record", () => {
    const printRecords = [];
    for (let i = 1; i <= 10; i++) {
      printRecords.push({ id: i });
    }
    const wrapper = shallow(<PrintsContainer printRecords={printRecords} />);
    const printComponents = wrapper.find("Print");

    expect(printComponents).toHaveLength(10);
  });
});
