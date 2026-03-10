/*
    Type: Componente
    User: Matheus Rodrigues
    Description: Componente para montar filtro de tabelas no sistema
    Date: 18/02/2026
*/

import { useState } from "react";
import { LuSearch, LuSearchX } from "react-icons/lu";
import styles from "./headerFilter.module.css";
import { selectOptions as UserSelectOptions } from "../../../utils/userSelectOptions";

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

  const formatYearDateInput = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 4)}/${numbers.slice(4)}`;

    return `${numbers.slice(0, 4)}/${numbers.slice(4, 6)}/${numbers.slice(6, 8)}`;
  };

  return (
    <thead>
      <tr>

        {/* Percorre dinamicamente as colunas recebidas por props */}
        {columns.map((col) => (
          // Cada coluna do header recebe uma célula
          <th key={col.dataKey}>
            {/* Texto visível da coluna */}
            <p>{col.text}</p>

            {/* Se o filtro da coluna estiver aberto, renderiza o input correpondente */}
            {openFilters[col.dataKey] && (
              col.type === "multiselect" ? (
                <select
                  className={styles.multiSelectFilter}
                  multiple
                  value={filters[col.dataKey] || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(
                      e.target.selectedOptions,
                      option => option.value
                    );
                    onFilterChange(col.dataKey, selectedValues);
                  }}
                >
                  {Object.entries(UserSelectOptions[col.optionsKey] || {}).map(
                    ([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              ) : col.type === "select" ? (
                <select
                  className={styles.selectFilter}
                  autoFocus
                  value={filters[col.dataKey] || ""}
                  onChange={(e) =>
                    onFilterChange(col.dataKey, e.target.value)
                  }
                >
                  <option value="">Todos</option>

                  {Object.entries(UserSelectOptions[col.optionsKey] || {}).map(
                    ([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  autoFocus
                  type="text"
                  placeholder={col.type === "date" ? "aaaa/mm/dd" : ""}
                  value={filters[col.dataKey] || ""}
                  onChange={(e) => {
                    if (col.type === "date") {
                      const formatted = formatYearDateInput(e.target.value);
                      onFilterChange(col.dataKey, formatted);
                    } else {
                      onFilterChange(col.dataKey, e.target.value);
                    }
                  }}
                />
              )
            )}

            {/*
              Alterna ícone dependendo do estado:
              - Aberto -> ícone de fechar (X)
              - fechado -> ícone de buscar
            */}
            {openFilters[col.dataKey] ? (
              <LuSearchX
                className={styles.searchIcon}
                onClick={() => toggleFilter(col.dataKey)}
              />
            ) : (
              <LuSearch
                className={styles.searchIcon}
                onClick={() => toggleFilter(col.dataKey)}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}