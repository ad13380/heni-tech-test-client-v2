import Row from "react-bootstrap/Row";

import Print from "./Print/Print";

export default function PrintsContainer({ printRecords }) {
  return (
    <Row>
      {printRecords.map((print) => (
        <Print
          key={print.id}
          print={print}
          data-test={"print-component-" + print.id}
        />
      ))}
    </Row>
  );
}
