import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { ThesisApi } from "../../../../api/api";
import Cookie from "js-cookie";

const ThesisDetail = () => {
  const token = Cookie.get("token");
  const api = new ThesisApi();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [tags, setTags] = useState([]);
  const [university, setUniversity] = useState("");
  const [professor, setProfessor] = useState("");
  const [creatorStudent, setCreatorStudent] = useState("");
  const [creatorExternal, setCreatorExternal] = useState("");
  const [images, setImages] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const thesisData = {
      title,
      description,
      prerequisites,
      tags,
      university,
      professor,
      creator_student: creatorStudent,
      creator_external: creatorExternal,
      images,
    };

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.professorThesisPost(thesisData, options);
      setMessage("Thesis created successfully!");
    } catch (error) {
      setError("Error creating thesis");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Thesis</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPrerequisites">
          <Form.Label>Prerequisites</Form.Label>
          <Form.Control
            type="text"
            value={prerequisites}
            onChange={(e) => setPrerequisites(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value.split(","))}
          />
        </Form.Group>
        <Form.Group controlId="formUniversity">
          <Form.Label>University</Form.Label>
          <Form.Control
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formProfessor">
          <Form.Label>Professor</Form.Label>
          <Form.Control
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCreatorStudent">
          <Form.Label>Creator Student</Form.Label>
          <Form.Control
            type="text"
            value={creatorStudent}
            onChange={(e) => setCreatorStudent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCreatorExternal">
          <Form.Label>Creator External</Form.Label>
          <Form.Control
            type="text"
            value={creatorExternal}
            onChange={(e) => setCreatorExternal(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formImages">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Thesis
        </Button>
      </Form>
    </div>
  );
};

export default ThesisDetail;
