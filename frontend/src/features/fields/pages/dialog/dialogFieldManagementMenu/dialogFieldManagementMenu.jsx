import { Dialog } from "@mui/material";
import styles from "./dialogFieldManagementMenu.module.css"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import fieldsServices from "../../../../../services/fieldsServices";

export default function DialogFieldManagementMenu({ open, onClose, typeDialog, field, fieldList, page }) {

  const [fieldsOrdered, setFieldsOrdered] = useState([]);
  const { updateFieldsOrder } = fieldsServices();

  useEffect(() => {
    if (!field) return;

    setFieldsOrdered(
      fieldList
        .filter(data => data.menuId === field.menuId)
        .sort((a, b) => a.order - b.order)
    );
  }, [fieldList, field]);

  const moveUp = (index) => {
    if (index === 0) return;
    const newList = [...fieldsOrdered];
    [newList[index - 1], newList[index]] = [
      newList[index],
      newList[index - 1]
    ];
    setFieldsOrdered(newList);
  };

  const moveDown = (index) => {
    if (index === fieldsOrdered.length - 1) return;
    const newList = [...fieldsOrdered];
    [newList[index], newList[index + 1]] = [
      newList[index + 1],
      newList[index]
    ];
    setFieldsOrdered(newList);
  };

  const saveOrder = async () => {

    const updatedFields = fieldsOrdered.map((item, index) => ({
      _id: item._id,
      order: index + 1
    }));

    const result = await updateFieldsOrder(updatedFields);

    if (result?.success) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.dialog}>
        {typeDialog === "menu" && (
          <div>
            <div className={styles.textTitle}>
              <h2 className="subtitle-page">Alteração de posição do campo:</h2>
              <h3 className="subtitle-page">{field.title}</h3>
            </div>

            <div className={styles.fieldListBox}>
              {fieldsOrdered.map((data, index) => (
                <div
                  key={data._id}
                  className={
                    data._id === field._id
                      ? `${styles.field} ${styles.fieldActive}`
                      : styles.field
                  }
                >
                  <p>{data.title}</p>

                  <div className={styles.btnArrows}>
                    <FaArrowAltCircleUp
                      onClick={() => moveUp(index)}
                    />
                    <FaArrowAltCircleDown
                      onClick={() => moveDown(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={saveOrder}>Alterar ordenação</button>
          </div>
        )}

        {typeDialog === "view" && (
          <div>
            <div>
              <h2 className="subtitle-page">Visualização do campo</h2>
              <h3 className="subtitle-page">{field.title}</h3>
            </div>
          </div>
        )}

        {typeDialog === "alter" && (
          <div>
            <div>
              <h2 className="subtitle-page">Edição do campo</h2>
              <h3 className="subtitle-page">{field.title}</h3>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )

}