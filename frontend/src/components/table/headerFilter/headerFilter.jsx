/*
    Type: Compenente
    User: Matheus Rodrigues
    Description: Componente para montar filtro de tabelas no sistema
    Date: 18/02/2026
*/

import { useState } from "react";
import { LuSearch, LuSearchX } from "react-icons/lu";
import styles from "./headerFilter.module.css";

// Componente reutilizável de cabeçalho com filtros
// Props:
// - columns → array com configuração das colunas (text, filter, type)
// - filters → objeto com os valores atuais dos filtros (controlado pelo componente pai)
// - onFilterChange → função callback para atualizar o filtro no componente pai
export default function HeaderFilter({ columns, filters, onFilterChange }) {

  // Estado interno para controlar quais filtros estão abertos
  // Estrutura esperada:
  // {
  //   name: true,
  //   cpf: false
  // }
  const [openFilters, setOpenFilters] = useState({});

  // Alterna abertura/fechamento de um filtro específico
  const toggleFilter = (field) => {
    setOpenFilters(prev => ({
      ...prev,
      [field]: !prev[field]
    }));

    // Se o filtro estava aberto e será fechado,
    // limpa o valor correspondente no estado global (componente pai)
    if (openFilters[field]) {
      onFilterChange(field, "");
    }
  };

  return (
    <thead>
      <tr className={styles.headerFilterTable}>

        {/* Percorre dinamicamente as colunas recebidas por props */}
        {columns.map((col) => (
          // Cada coluna do header recebe uma célula
          <td key={col.filter}>
            {/* Texto visível da coluna */}
            <p>{col.text}</p>

            {/* Se o filtro da coluna estiver aberto, renderiza o input correpondente */}
            {openFilters[col.filter] && (
              <input
                autoFocus //Foca automaticamente ao abrir
                type={col.type} //Tipo definido na configuração (text, date, etc)
                value={filters[col.filter] || ""}
                onChange={(e) =>
                  onFilterChange(col.filter, e.target.value)
                }
              />
            )}

            {/*
              Alterna ícone dependendo do estado:
              - Aberto -> ícone de fechar (X)
              - fechado -> ícone de buscar
            */}
            {openFilters[col.filter] ? (
              <LuSearchX
                className={styles.searchIcon}
                onClick={() => toggleFilter(col.filter)}
              />
            ) : (
              <LuSearch
                className={styles.searchIcon}
                onClick={() => toggleFilter(col.filter)}
              />
            )}
          </td>
        ))}
      </tr>
    </thead>
  )
}