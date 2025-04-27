export default function formatarParaBrasil(dataUSA) {
  const meses = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };

  const [mesTexto, diaComVirgula, ano] = dataUSA.split(' ');
  const dia = diaComVirgula.replace(',', '').padStart(2, '0');
  const mes = meses[mesTexto];

  return `${dia}/${mes}/${ano}`;
}