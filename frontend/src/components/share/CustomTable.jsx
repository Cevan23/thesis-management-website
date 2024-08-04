import React, { useState } from 'react';
import { Table, Pagination, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const CustomTable = ({ headers, data, totalRecords, totalPages, onFilterChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (column, value) => {
    const newFilters = { ...filters, [column]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>
                <InputGroup>
                  <FormControl
                    placeholder={`Filter ${header.label}`}
                    onChange={(e) => handleFilterChange(header.label, e.target.value)}
                  />
                  <DropdownButton variant="outline-secondary" title="⋮">
                    <Dropdown.Item onClick={() => handleFilterChange(header.label, '')}>Clear Filter</Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>
                  {header.render ? header.render(row[header.label], row) : row[header.label]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={headers.length}>
              <Pagination>
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <Pagination.Item
                    key={pageIndex + 1}
                    active={pageIndex + 1 === currentPage}
                    onClick={() => handlePageChange(pageIndex + 1)}
                  >
                    {pageIndex + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
              <div>
                Page {currentPage} of {totalPages} | Total Records: {totalRecords}
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default CustomTable;
