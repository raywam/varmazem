const getDate = () => {
  const todayDate = new Date();
  const yyyy = todayDate.getFullYear();
  let mm : any = todayDate.getMonth() + 1; // Months start at 0!
  let dd : any = todayDate.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return (dd + '/' + mm + '/' + yyyy);
}

export default { getDate }
