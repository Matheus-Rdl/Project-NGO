/*
    Type: Component
    Name: HandleBack
    Description:
      Componente handleBack responsável por voltar uma tela do sistema, usado várias vezes.
    Author: Matheus Rodrigues
    Last Edit: 01/04/2026
*/

import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function HandleBack() {
  const navigate = useNavigate();

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
    </div>
  );
}
