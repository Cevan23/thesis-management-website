import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import UserDetail from "./UserDetail";
import CustomTable from "../../../share/CustomTable";
import { ExternalApi } from "../../../../api/api";
const UserList = () => {
  const externalApi = new ExternalApi();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [headers, setHeaders] = useState([]);
  const [externalList, setExternalList] = useState();
  useEffect(() => {
    try {
      const getListExternal = async () => {
        try {
          const response = await externalApi.adminExternalGet();
          if (response.data.docs && response.data.docs.length > 0) {
            // Xác định các tiêu đề cột và hàm render
            const headersWithRender = Object.keys(response.data.docs[0]).map(
              (key) => {
                let renderFunction;

                // Xác định hàm render cho từng kiểu dữ liệu
                switch (key) {
                  case "active":
                    renderFunction = (value) => (value ? "✔️" : "❌");
                    break;
                  case "dateCreated":
                    renderFunction = (value) =>
                      new Date(value).toLocaleDateString();
                    break;
                  default:
                    renderFunction = (value) => value; // Render giá trị mặc định
                }

                return {
                  label: key,
                  render: renderFunction,
                };
              }
            );
          
          setHeaders(headersWithRender);
          }
          setExternalList(response.data);
        } catch (error) {
          setError("Failed to fetch data");
        }
      };
      getListExternal();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleFilterChange = (filters) => {
    if (!externalList) return;

    const filteredData = Object.keys(filters).reduce((acc, key) => {
      if (filters[key]) {
        return acc.filter((item) =>
          item[key]
            ?.toString()
            .toLowerCase()
            .includes(filters[key].toLowerCase())
        );
      }
      return acc;
    }, externalList.docs);
    setExternalList((prevList) => ({
      ...prevList,
      docs: filteredData,
    }));
  };

  return (
    <Container className="mt-4">
      <h1>User List</h1>
      <CustomTable
        headers={headers}
        data={externalList?.docs || []}
        totalRecords={externalList?.count || 0}
        totalPages={externalList?.pages || 0}
        onFilterChange={handleFilterChange}
      />
      <Button variant="primary">Go to Home Page</Button>
    </Container>
  );
};

export default UserList;
