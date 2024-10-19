const formatDate = (dateInput) => {
  // Dividimos la fecha en año, mes y día
  const [year, month, day] = dateInput.split("-").map(Number);

  // Creamos un nuevo objeto Date utilizando los valores obtenidos
  const date = new Date(year, month - 1, day); // Restamos 1 al mes porque los meses en JS van de 0 a 11

  if (isNaN(date.getTime())) {
    // Si la fecha no es válida, retorna un valor por defecto
    return "Fecha inválida";
  }

  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

export default formatDate;
