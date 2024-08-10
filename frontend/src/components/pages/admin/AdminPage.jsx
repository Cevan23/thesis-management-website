import { Container, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import CustomTable from "../../share/Table/CustomTable";
import { ExternalApi } from "../../../api/api";

const AdminPage = () => {
  const navigate = useNavigate();
  const token = Cookie.get("token");
  const externalApi = new ExternalApi();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [headers, setHeaders] = useState([]);
  const [externalList, setExternalList] = useState();
  const [loading, setLoading] = useState(false);
  const [originalList, setOriginalList] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      const getListExternal = async (page) => {
        try {
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await externalApi.adminExternalGet(page, options);
          if (response.data.docs && response.data.docs.length > 0) {
            // Xác định các tiêu đề cột và hàm render
            const activateExternal = async (id) => {
              try {
                const response = await externalApi.adminExternalActivateExternalIdPatch(id);
                setSuccess(response.data.message);
                updateExternalList(id);
              } catch (error) {
                setError('Failed to activate user');
              }
              setLoading(false);
            };

            const updateExternalList = (id) => {
              setExternalList((prevList) => ({
                ...prevList,
                docs: prevList.docs.map((doc) =>
                  doc._id === id ? { ...doc, active: true } : doc
                ),
              }));
            };

            const headersWithRender = Object.keys(response.data.docs[0]).map((key) => {
              let renderFunction;

              
              switch (key) {
                case "active":
                  renderFunction = (value) => (value ? "✔️" : "❌");
                  break;
                case "dateCreated":
                  renderFunction = (value) => new Date(value).toLocaleDateString();
                  break;
                default:
                  renderFunction = (value) => value;
              }

              return {
                label: key,
                render: (row) => renderFunction(row[key]),
              };
            });

            headersWithRender.push({
              label: 'Activate',
              render: (row) => {
                if (!row || !row._id) {
                  setError("Item or item._id is undefined");
                  return null;
                }
                return (
                  <Button
                    variant="primary"
                    onClick={() => activateExternal(row._id)}
                  >
                    Activate
                  </Button>
                );
              },
            });

            setHeaders(headersWithRender);
          }
          setExternalList(response.data);
          setOriginalList(response.data);
        } catch (error) {
          setError("Failed to fetch data");
        }
      };

      getListExternal(currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage]);

  const handleFilterChange = (filters) => {
    if (!externalList) return;

    const filteredData = Object.keys(filters).reduce((acc, key) => {
      if (filters[key]) {
        return acc.filter((item) =>
          item[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        );
      }
      return acc;
    }, originalList.docs);

    setExternalList((prevList) => ({
      ...prevList,
      docs: filteredData,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  return (
    <Container className="mt-4 p-3">
      <div class="d-flex justify-content-between">
        <span>External Management</span>
        <Button variant="primary" onClick={() => navigate('/signup')}>Create</Button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {loading && <Spinner animation="border" />} {

      }
      {!loading && ( 
      <CustomTable 
        headers={headers}
        data={externalList?.docs || []}
        totalRecords={externalList?.count || 0}
        totalPages={externalList?.pages || 0}
        onFilterChange={handleFilterChange}
        maxHeight="1200px"
        width="120%"
        enableScroll={true}
        onPageChange={handlePageChange}
      />
      )}
    </Container>
  );
}

export default AdminPage;
