import { useEffect, useState } from "react";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import styles from "./dialogFieldManagementMenu.module.css";

import fieldsServices from "../../../../../services/fieldsServices";

export default function DialogMenu({ field, fieldList, refreshFields, onClose }) {

  const { updateFieldsOrder } = fieldsServices();

  const [fieldsOrdered, setFieldsOrdered] = useState([]);

  useEffect(() => {
    if (!field) return;
    const ordered = fieldList
      .filter(item => item.menuId === field.menuId)
      .sort((a, b) => a.order - b.order);
    setFieldsOrdered(ordered);
  }, [field, fieldList]);

  const moveUp = (index) => {
    if (index === 0) return;
    setFieldsOrdered(prev => {
      const list = [...prev];
      [list[index - 1], list[index]] = [
        list[index],
        list[index - 1]
      ];
      return list;
    });
  }

  const moveDown = (index) => {
    if (index === fieldsOrdered.length - 1) return;
    setFieldsOrdered(prev => {
      const list = [...prev];
      [list[index], list[index + 1]] = [
        list[index + 1],
        list[index]
      ];
      return list;
    });
  }

  const saveOrder = async () => {
    const payload = fieldsOrdered.map((field, index) => ({
      _id: field._id,
      order: index + 1
    }));

    const result = await updateFieldsOrder(payload);
    if (result?.success) {
      refreshFields();
      onClose();
    }
  }

  return (

    <div className={styles.dialogMenu}>
      <div className={styles.textTitle}>
        <h2>
          Alteração de posição
        </h2>

        <h3>
          {field.title}
        </h3>
      </div>

      <div className={styles.fieldListBox}>
        {fieldsOrdered.map((item, index) => {
          const isActive = item._id === field._id;
          const isFirst = index === 0;
          const isLast = index === fieldsOrdered.length - 1;

          return (
            <div
              key={item._id}
              className={
                isActive
                  ? `${styles.field} ${styles.fieldActive}`
                  : styles.field
              }
            >
              <p>{item.title}</p>

              <div className={styles.btnArrows}>
                <FaArrowAltCircleUp
                  onClick={!isFirst ? () => moveUp(index) : undefined}
                  style={{
                    opacity: isFirst ? 0.3 : 1,
                    cursor: isFirst ? "default" : "pointer"
                  }}
                />

                <FaArrowAltCircleDown
                  onClick={!isLast ? () => moveDown(index) : undefined}
                  style={{
                    opacity: isLast ? 0.3 : 1,
                    cursor: isLast ? "default" : "pointer"
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={saveOrder}
      >
        Salvar
      </button>
    </div>
  )
}