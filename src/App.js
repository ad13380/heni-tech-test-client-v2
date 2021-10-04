import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import PaginationContainer from "./components/Pagination/PaginationContainer";
import PrintsContainer from "./components/PrintsContainer/PrintsContainer";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [printsData, setPrintsData] = useState({ info: {}, records: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadPrintData = async (page) => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get("/api/prints", {
          baseURL: "https://heni-stealth.herokuapp.com",
          params: {
            page,
          },
        });
        setPrintsData(response.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
      setIsLoading(false);
    };

    loadPrintData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="App">
      <Container>
        <h1>Heni Tech Test Frontend</h1>
        {isError ? (
          <Alert data-test="error-alert" variant="danger">
            Something went wrong...
          </Alert>
        ) : (
          <>
            {isLoading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <>
                <PrintsContainer printRecords={printsData.records} />
                <PaginationContainer
                  currentPage={currentPage}
                  totalPages={printsData.info.pages}
                  handlePageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
