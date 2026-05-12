/*
    Type: Page
    Name: FieldsManagement
    Description:
      Página FieldsManagement, responsável por organizar os campos das coleções.
    Author: Matheus Rodrigues
    Last Edit: 21/04/2026
*/

import { Link } from "react-router-dom";
import HandleBack from "../../../components/handleBack/handleBack";
import styles from "../styles/fieldsManagement.module.css";

export default function FieldsManagement() {
  // Lista das coleções CHUMBADO
  const listCollection = [
    {
      label: "Usuários",
      value: "users",
    },
    {
      label: "Atividades",
      value: "activities",
    },
    {
      label: "Usuários do sistema",
      value: "users_system",
    }
  ];

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Coleções dos campos</h1>

      {listCollection.map((collection) => (
        <div key={collection.value} className="card-list-box-form">
          <Link
            to={"/FieldsManagementList"}
            state={{ collection: collection.value, label: collection.label }}
          >
            <h1>{collection.label}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}