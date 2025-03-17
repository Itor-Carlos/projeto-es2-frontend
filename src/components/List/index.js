import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import './index.css';
import { Toast } from '../Toast';
import { useNavigate } from 'react-router-dom';

export const List = ({ entity, headers, itemsPerPage = 5, baseUrl, page = 1, pageSize = 10 }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl + `?page=${page}&pageSize=${pageSize}`);
        const data = await response.json();

        setRows(data.rows || []);
        setFilteredRows(data.rows || []);
      } catch (error) {
        setToastMessage("Erro ao carregar informações");
        setToastType("error");
        setIsToastOpen(true);
      }
    };
    fetchData();
  }, [baseUrl, page, pageSize]);

  useEffect(() => {
    const filteredData = rows.filter((row) => {
      return headers.some(header => {
        const value = row[header.name]?.toString().toLowerCase();
        return value && value.includes(searchQuery.toLowerCase());
      });
    });
    setFilteredRows(filteredData);
  }, [searchQuery, rows, headers]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedData = filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const changePage = (page) => setCurrentPage(page);
  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const onDelete = async (row) => {
    try {
      const request = await fetch(`${baseUrl}/${row[Object.keys(row)[0]]}`, {
        method: 'DELETE',
      });
      const response = await request.json();
      setToastMessage(response.message);
      setToastType("success");
      setIsToastOpen(true);
      setRows(rows.filter(r => r[Object.keys(r)[0]] !== row[Object.keys(row)[0]]));
      setFilteredRows(filteredRows.filter(r => r[Object.keys(r)[0]] !== row[Object.keys(row)[0]]));    
    } catch (error) {
      setToastMessage("Erro ao excluir registro");
      setToastType("error");
      setIsToastOpen(true);
    }
  };

  const onEdit = (event) => {
    navigate(`/area/editar/${event[Object.keys(event)[0]]}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          onChange={handleInputChange}
          type="text" 
          placeholder={`Buscar ${entity}`} 
          value={searchTerm}
        />
        <button onClick={handleSearch} className="btn btn-secondary">Buscar</button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.name}>{header.label}</th>
              ))}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => (
                    <td key={header.name}>
                      {header.type === 'boolean'
                        ? row[header.name] ? 'Sim' : 'Não'
                        : !header.formatFunction ? row[header.name] : header.formatFunction(row)
                        }
                    </td>
                  ))}
                  <td className="action-cell">
                    <button 
                      className="action-btn edit-btn" 
                      title="Editar" 
                      onClick={() => onEdit(row)}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button 
                      className="action-btn delete-btn" 
                      title="Remover" 
                      onClick={() => onDelete(row)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} style={{ textAlign: 'center' }}>
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 0 && (
        <div className="pagination">
          <button className="page-btn" onClick={goToPrevPage} disabled={currentPage === 1}>«</button>
          {[...Array(totalPages)].map((_, index) => (
            <button 
              key={index} 
              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`} 
              onClick={() => changePage(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button className="page-btn" onClick={goToNextPage} disabled={currentPage === totalPages}>»</button>
        </div>
      )}

      <Toast isOpen={isToastOpen} onClose={() => setIsToastOpen(false)} message={toastMessage} type={toastType} />
    </div>
  );
};