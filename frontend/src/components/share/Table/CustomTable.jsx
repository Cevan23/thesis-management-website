import React, { useState } from 'react';
import { Table, Pagination, InputGroup, FormControl, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Table.scss'

const CustomTable = ({ headers, data, totalRecords, totalPages, onFilterChange, maxHeight, width, enableScroll }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [filterValues, setFilterValues] = useState({});

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (column, value) => {
    const newFilters = { ...filters, [column]: value };
    const newFilterValues = { ...filterValues, [column]: value };
    setFilters(newFilters);
    setFilterValues(newFilterValues);
    onFilterChange(newFilters);
  };

  const clearFilter = (column) => {
    const newFilters = { ...filters, [column]: '' };
    const newFilterValues = { ...filterValues, [column]: '' };
    setFilters(newFilters);
    setFilterValues(newFilterValues);
    onFilterChange(newFilters);
  };

  return (
    <Container 
    className="scrollable-container">{
    <div style={{ maxHeight: enableScroll ? maxHeight : 'none', width: width, overflowY: enableScroll ? 'auto' : 'visible' }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th 
              key={index}
              style={{ width: header.width || 'auto' }}
              >
                <InputGroup>
                  <FormControl
                    placeholder={`Filter ${header.label}`}
                    value={filterValues[header.label] || ''}
                    onChange={(e) => handleFilterChange(header.label, e.target.value)}
                  />
                  <DropdownButton variant="outline-secondary" title="⋮">
                    <Dropdown.Item onClick={() => clearFilter(header.label)}>Clear Filter</Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, cellIndex) => (
                  <td key={cellIndex}>
                    {header.render ? header.render(row) : row[header.label]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No data available</td>
            </tr>
          )}
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
      
    </div>}
    </Container>
  );
};

CustomTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  totalRecords: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  maxHeight: PropTypes.string,
  width: PropTypes.string,
  enableScroll: PropTypes.bool,
};

CustomTable.defaultProps = {
  maxHeight: '400px',
  width: '100%',
  enableScroll: true,
};

export default CustomTable;
