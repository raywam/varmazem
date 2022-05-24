const getDate = () => {
  const todayDate = new Date();
  const yyyy = todayDate.getFullYear();
  let mm : any = todayDate.getMonth() + 1; // Months start at 0!
  let dd : any = todayDate.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return (dd + '/' + mm + '/' + yyyy);
}

const formatDate = (value) => {
  let v = value

  if (v.match(/^\d{2}$/) !== null) {
      v = v + '/';
  } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
      v = v + '/';
  }

  return v;
}

export default { getDate, formatDate }
