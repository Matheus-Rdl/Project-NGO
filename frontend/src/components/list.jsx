import { Table } from "@chakra-ui/react";
import {
  formatCPF,
  formatDate,
  formatName,
  formatRG,
  formatProperNoun,
} from "../utils/formatters";
import { selectOptions } from "../utils/userSelectOptions";
import usersServices from "../services/usersServices";
import { useEffect } from "react";

export default function List({ data, ativo, onClick, page, columns }) {
  const { getUsersByActivity, userListActivies, refetchUsers } =
    usersServices();

  const formatters = {
    cpf: formatCPF,
    rg: formatRG,
    name: formatName,
    date: formatDate,
    proper: formatProperNoun
  };

  useEffect(() => {
    if (refetchUsers) {
      getUsersByActivity(data.activity_mat);
    }
  }, [refetchUsers]);


  // Função segura para obter as opções
  const getSelectOptions = (fieldName) => {
    return selectOptions?.[fieldName] || {};
  };

  // Função segura para obter o valor formatado
  const getFormattedValue = (fieldName, value) => {
    if (!fieldName || value === undefined || value === null) return "";
    const options = getSelectOptions(fieldName);
    return options?.[value] || value || "";
  };

  const activeProps = ativo ? {
    bg: "brand.primary",
    color: "white",
    _hover: { bg: "brand.primary", opacity: 0.8 },
  } : {
    _hover: { bg: "gray.100" },
  };

  return (
    <>
      {page === "peopleManagement" ? (

        <Table.Row
          cursor="pointer"
          onClick={onClick}
          {...activeProps}
        >
          <Table.Cell>{getFormattedValue("user_situation", data.user_situation)}</Table.Cell>
          <Table.Cell>{data.user_mat}</Table.Cell>
          <Table.Cell>{formatName(data.user_name)}</Table.Cell>
          <Table.Cell>
            {data.user_type
              .map((id) => getFormattedValue("user_type", id))
              .join(" | ")}
          </Table.Cell>
          <Table.Cell>{formatCPF(data.user_cpf)}</Table.Cell>
          <Table.Cell>{formatRG(data.user_rg)}</Table.Cell>
          <Table.Cell>{formatDate(data.user_registration_date)}</Table.Cell>
          <Table.Cell>{formatDate(data.user_date_nasc)}</Table.Cell>
          <Table.Cell>{formatProperNoun(data.user_district)}</Table.Cell>
          <Table.Cell>{formatProperNoun(data.user_street)}</Table.Cell>
          <Table.Cell>{formatName(data.user_mother_name)}</Table.Cell>
        </Table.Row>

      ) : page === "activityManagement" ? (

        <Table.Row
          cursor="pointer"
          onClick={onClick}
          {...activeProps}
        >
          <Table.Cell>{data.activity_mat}</Table.Cell>
          <Table.Cell>{formatProperNoun(data.activity_title)}</Table.Cell>
          <Table.Cell>{getFormattedValue("activity_type", data.activity_type).slice(3)}</Table.Cell>
          <Table.Cell>
            {Array.isArray(data.activity_days)
              ? data.activity_days
                .map(day => getFormattedValue("activity_days", day).slice(3))
                .join(" | ")
              : getFormattedValue("activity_days", data.activity_days).slice(3)}
          </Table.Cell>
          <Table.Cell>{userListActivies.length}</Table.Cell>
          <Table.Cell>{data.activity_time_start}</Table.Cell>
          <Table.Cell>{data.activity_time_end}</Table.Cell>
        </Table.Row>

      ) : page === "activityManagementUsers" ? (

        <Table.Row
          cursor="pointer"
          onClick={onClick}
          {...activeProps}
        >
          <Table.Cell>{data.user_mat}</Table.Cell>
          <Table.Cell>{formatName(data.user_name)}</Table.Cell>
          <Table.Cell>{data.user_registration_date}</Table.Cell>
          <Table.Cell>{data.user_date_nasc}</Table.Cell>
        </Table.Row>

      ) : (
        <Table.Row
          cursor="pointer"
          onClick={onClick}
          {...activeProps}
        >
          {columns.map((col) => {

            let value = data[col.dataKey];

            if (col.optionsKey) {

              if (Array.isArray(value)) {
                value = value
                  .map((v) => selectOptions[col.optionsKey]?.[v] ?? v)
                  .join(", ");
              } else {
                value = selectOptions[col.optionsKey]?.[value] ?? value;
              }
            }

            return <Table.Cell key={col.dataKey}>{value}</Table.Cell>;
          })}
        </Table.Row>
      )}
    </>
  );
}
