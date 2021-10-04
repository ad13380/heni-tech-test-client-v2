import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import Print from "./Print";
Enzyme.configure({ adapter: new Adapter() });

describe("<Print />", () => {
  const printRecord = {
    primaryimageurl: "image.com",
    description: "description of the print",
    title: "Print title",
    dated: "Date of print",
    people: [{ role: "Artist", name: "Name of artist" }],
  };
  const incompletePrintRecord = {
    primaryimageurl: "image.com",
    description: "description of the print",
    title: null,
    dated: null,
    people: [],
  };

  it("should contain a hidden print modal with a full resolution image", () => {
    const wrapper = shallow(<Print print={printRecord} />);
    const printModal = wrapper.find("Modal");

    expect(printModal.prop("show")).toBeFalsy();
    expect(printModal.find("img").prop("src")).toEqual("image.com");
    expect(printModal.find("img").prop("alt")).toEqual(
      "description of the print"
    );
  });

  it("should contain a print image of lower resolution", () => {
    const wrapper = shallow(<Print print={printRecord} />);
    const cardImage = wrapper.find("CardImg");

    expect(cardImage.prop("src")).toEqual("image.com?width=300");
    expect(cardImage.prop("alt")).toEqual("description of the print");
  });

  it("should contain a print body with print information", () => {
    const wrapper = shallow(<Print print={printRecord} />);
    const cardBody = wrapper.find("CardBody");

    expect(cardBody.text().includes("Name of artist")).toBeTruthy();
    expect(cardBody.text().includes("Print title")).toBeTruthy();
    expect(cardBody.text().includes("Date of print")).toBeTruthy();
  });

  describe("when print information is missing", () => {
    it("should contain a print body with placeholder information", () => {
      const wrapper = shallow(<Print print={incompletePrintRecord} />);
      const cardBody = wrapper.find("CardBody");

      expect(cardBody.text().includes("Unknown artist")).toBeTruthy();
      expect(cardBody.text().includes("[no title]")).toBeTruthy();
      expect(cardBody.text().includes("Unknown date")).toBeTruthy();
    });
  });
});
