import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { selectOptions } from "../utils/userSelectOptions";

export async function generateAttendanceExcel({
  turma,
  alunos,
  mes,
  ano
}) {

  console.log(turma.activity_days) //=7

    const activityDayText =
    selectOptions.activity_days[turma.activity_days]?.split(" - ")[1];

  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Presença");

  const diasDoMes = new Date(ano, mes, 0).getDate();

  const dias = [];

  const monthNames = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  for (let dia = 1; dia <= diasDoMes; dia++) {
    const data = new Date(ano, mes - 1, dia);

    if (data.getDay() === Number(turma.activity_days) - 1) {
      dias.push(dia);
    }
  }

  const totalColumns = dias.length + 2;
  sheet.mergeCells(1, 1, 1, totalColumns);
  const titleCell = sheet.getCell("A1");

  titleCell.value =
    `Turma - ${turma.activity_title} - ${activityDayText} - ${turma.activity_time_start} às ${turma.activity_time_end}`;
  titleCell.font = {
    bold: true,
    size: 12,
  };
  titleCell.alignment = {
    horizontal: "center",
    vertical: "middle",
  };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "A9D08E" },
  };
  titleCell.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  sheet.addRow([
    "Matrícula",
    "Aluno",
    ...dias.map(
      (d) =>
        `${String(d).padStart(2, "0")}/${monthNames[mes - 1]}`
    )
  ]);

  alunos.forEach((aluno) => {

    sheet.addRow([
      aluno.matricula,
      aluno.nome,
      ...dias.map(() => ""),
    ]);
  });

  for (let i = 0; i < 6; i++) {
    sheet.addRow([
      "",
      "",
      ...dias.map(() => ""),
    ]);
  }

  const headerRow = sheet.getRow(2);

  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E2EFDA" },
    };

    cell.font = {
      bold: true,
      color: { argb: "FF000000" },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  sheet.eachRow((row) => {

    row.eachCell((cell) => {

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

    });

  });
  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Lista_${turma.activity_title}.xlsx`
  );
}