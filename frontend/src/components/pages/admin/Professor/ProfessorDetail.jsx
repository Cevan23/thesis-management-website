import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfessorDetail = () => {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [headers, setHeaders] = useState([]);
    const [professorDetail, setProfessorDetail] = useState();
    const [loading, setLoading] = useState(false);
    const [originalDetail, setOriginalDetail] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    return (
        <div>
        <h1>Professor Detail</h1>
        </div>
    );
    
};

export default ProfessorDetail;