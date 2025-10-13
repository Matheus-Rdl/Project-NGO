// Função para formatar CPF (ex: 12345678912 → 123.456.789-12)
export function formatCPF(cpf) {
  if (!cpf) return "";
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Função para formatar RG 
export function formatRG(rg) {
  if (!rg) return "";

  return rg
    .replace(/\D/g, "")               
    .replace(/(\d{2})(\d)/, "$1.$2")  
    .replace(/(\d{3})(\d)/, "$1.$2")   
    .replace(/(\d{3})(\d{1})$/, "$1-$2"); 
}

//Formatar datas vindo do mongoDB
export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam em 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

//Formatar nomes de pessoas
export function formatName(name) {
  if (!name) return "";

  const lowercaseWords = ["de", "da", "do", "dos", "das", "e"];

  return name
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      if (lowercaseWords.includes(word) && index !== 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

//Nome Proprio
export function formatProperNoun(text) {
  if (!text) return "";

  return text
    .toLowerCase() 
    .split(" ")   
    .filter(Boolean) 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}



