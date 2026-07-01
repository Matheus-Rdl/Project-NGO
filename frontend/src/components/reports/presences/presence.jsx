//import { Dialog } from "@mui/material";
import { useState } from "react";
import styles from "./presence.module.css";
import { generatePresenceReport } from "../../../services/reports/presences/generatePresenceReport";

export default function Presence({ open, onClose, activityData, usersList }) {
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [format, setFormat] = useState("pdf");

	//console.log(usersList)

	const months = [
		{ value: 1, label: "Janeiro" },
		{ value: 2, label: "Fevereiro" },
		{ value: 3, label: "Março" },
		{ value: 4, label: "Abril" },
		{ value: 5, label: "Maio" },
		{ value: 6, label: "Junho" },
		{ value: 7, label: "Julho" },
		{ value: 8, label: "Agosto" },
		{ value: 9, label: "Setembro" },
		{ value: 10, label: "Outubro" },
		{ value: 11, label: "Novembro" },
		{ value: 12, label: "Dezembro" },
	];

	const anos = [2024, 2025, 2026];

	function handleSubmit(event) {
		event.preventDefault();
		generatePresenceReport({
			formato: format,
			turma: activityData,
			mes: month,
			ano: year,
			alunos: usersList,
		})
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<div className={styles.dialogBox}>
				<h1 className={styles.dialogTitle}>Presença da Atividade</h1>

				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label>Mês:</label>

						<select
							required
							className={styles.formSelect}
							value={month}
							onChange={(e) => setMonth(Number(e.target.value))}
						>
							<option value="">Selecione o mês</option>

							{months.map((month) => (
								<option key={month.value} value={month.value}>
									{month.label}
								</option>
							))}
						</select>
					</div>

					<div className={styles.formGroup}>
						<label>Ano:</label>

						<select
							required
							className={styles.formSelect}
							value={year}
							onChange={(e) => setYear(Number(e.target.value))}
						>
							<option value="">Selecione o ano</option>

							{anos.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>

					<div className={styles.formGroupSelect}>
						<label>Formato:</label>

						<div className={styles.radioGroup}>
							<label>
								<input
									type="radio"
									name="format"
									value="pdf"
									checked={format === "pdf"}
									onChange={(e) => setFormat(e.target.value)}
								/>
								PDF
							</label>

							<label>
								<input
									type="radio"
									name="format"
									value="excel"
									checked={format === "excel"}
									onChange={(e) => setFormat(e.target.value)}
								/>
								Excel
							</label>

							{/*
							<label>
								<input
									type="radio"
									name="format"
									value="print"
									checked={format === "print"}
									onChange={(e) => setFormat(e.target.value)}
								/>
								Impressão
							</label>
							*/}
						</div>
					</div>

					<button
						type="submit"
						className={styles.btnSaveActivity}>
						Gerar
					</button>
				</form>
			</div>
		</Dialog>
	);
}