import { useState, useEffect } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import CustomTable from "../../../share/Table/CustomTable";
import { UserApi } from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const UserList = () => {
  const token = Cookie.get("token");
  const userApi = new UserApi();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [headers, setHeaders] = useState([]);
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(false);
  const [originalList, setOriginalList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRole, setCurrentRole] = useState("Professor");
  const navigate = useNavigate();
  const roles = ["Professor", "Student", "Secretariat"];

  useEffect(() => {
    try {
      const getListUser = async (page, role) => {
        try {
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await userApi.adminUserRoleGet(role,page, options);
          if (response.data.docs && response.data.docs.length > 0) {
            // function UD
            const updateUser = async (id) => {
              try {
                navigate(`/admin/user/detail/${id}`);
              } catch (error) {
                setError("Failed to activate user");
              }
              setLoading(false);
            };
            const deleteUser = async (id) => {
              try {
                const options = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const response = await userApi.adminUserUserIdDelete(
                  id,
                  options
                );
                setSuccess(response.data.message);
              } catch (error) {
                setError("Failed to delete user");
              }
              setLoading(false);
            };
            // conver data type
            const headersWithRender = Object.keys(response.data.docs[0]).map(
              (key) => {
                let renderFunction;
                switch (key) {
                  case "active":
                    renderFunction = (value) => (value ? "✔️" : "❌");
                    break;
                  case "dateCreated":
                    renderFunction = (value) =>
                      new Date(value).toLocaleDateString();
                    break;
                  default:
                    renderFunction = (value) => value;
                }

                return {
                  label: key,
                  render: (row) => renderFunction(row[key]),
                };
              }
            );
            // add column
            headersWithRender.push({
              label: "",
              render: (row) => {
                if (!row || !row._id) {
                  setError("Item or item._id is undefined");
                  return null;
                }
                return (
                  <div>
                    <Button
                      variant="primary"
                      onClick={() => updateUser(row._id)}
                    >
                      update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(row._id)}
                    >
                      delete
                    </Button>
                  </div>
                );
              },
            });

            setHeaders(headersWithRender);
          }
          // set data on table
          setUserList(response.data);
          setOriginalList(response.data);
        } catch (error) {
          setError("Failed to fetch data");
        }
      };

      getListUser(currentPage, currentRole);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage, currentRole]);

  const handleFilterChange = (filters) => {
    if (!userList) return;

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
    }, originalList.docs);

    setUserList((prevList) => ({
      ...prevList,
      docs: filteredData,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRoleChange = (event) => {
    setCurrentRole(event.target.value);
  };

  return (
    <Container className="mt-4 p-3">
      <div class="d-flex justify-content-between">
        <span>User List </span>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/user/detail")}
        >
          Create
        </Button>
        <select
          id="roleSelect"
          value={currentRole}
          onChange={handleRoleChange}
          className="form-control"
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {loading && <Spinner animation="border" />} {}
      {!loading && (
        <CustomTable
          headers={headers}
          data={userList?.docs || []}
          totalRecords={userList?.count || 0}
          totalPages={userList?.pages || 0}
          onFilterChange={handleFilterChange}
          maxHeight="1200px"
          width="120%"
          enableScroll={true}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default UserList;
