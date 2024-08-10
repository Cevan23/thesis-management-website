import { useState, useEffect } from "react";
import {
  UserApi,
  AdminUserPostRequestRoleEnum,
  UniversityApi,
} from "../../../../api/api";
import Cookie from "js-cookie";

const UserDetail = ({ userId }) => {
  const token = Cookie.get("token");
  const userApi = new UserApi();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [user, setUser] = useState({});
  const [isEditMode] = useState(false);
  const [universities, setUniversities] = useState([]);
  const universityApi = new UniversityApi();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await universityApi.universityGetGet(1,null,options);
        if (response) {
            const universities = response.data.docs.map((university) => ({
                id: university._id,
                name: university.name,
              }));
          setUniversities(universities);
          if ( !user.university && universities.length > 0) {
            setUser((prevState) => ({
              ...prevState,
              university: universities[0].id, 
            }));
          }
        } else {
          console.error(
            'Expected data format with "docs" array, but got:',
            response
          );
        }
      } catch (error) {
        setError("Failed to fetch universities");
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
    
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await userApi.adminUserPost(user,options);
      setSuccess(response.data.message);
      
    } catch (error) {
      setError("An error occurred. Please try again.", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <h2 className="text-center">
          {isEditMode ? "Update User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Lastname</label>
            <input
              className="form-control"
              type="text"
              name="lastname"
              value={user.lastname || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-select"
              name="role"
              value={user.role || AdminUserPostRequestRoleEnum.Guest}
              onChange={handleChange}
            >
              {Object.values(AdminUserPostRequestRoleEnum).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
  <label>University</label>
  <select
    className="form-select"
    name="university"
    value={user.university || (universities.length > 0 ? universities[0].id : '')}
    onChange={handleChange}
  >
    {universities.map((univ) => (
      <option key={univ.id} value={univ.id}>
        {univ.name}
      </option>
    ))}
  </select>
</div>
          <div className="mb-3">
            <label>Profile Image</label>
            <input
              className="form-control"
              type="text"
              name="imageprofile"
              value={user.imageprofile || ""}
              onChange={handleChange}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
