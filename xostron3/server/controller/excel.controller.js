const db = require('../db').pool
const excelJS = require("exceljs");


class excelController {

    async exportExcel(req, res) {
        const dict = await db.query('SELECT * from dicteng')
        //console.log(dict.rows)
        // res.status(200).json(dict.rows)

        //подключение и конфигурирование excel
        const workbook = new excelJS.Workbook();  // Create a new workbook
        const worksheet = workbook.addWorksheet("My Words"); // New Worksheet
        const path = "./files";  // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [
            { header: "Id", key: "id", width: 10 },
            { header: "Word", key: "word", width: 10 },
            { header: "Transcriptipn", key: "transcription", width: 10 },
            { header: "Translate", key: "translate", width: 10 },
            { header: "Comment", key: "comment", width: 10 },
        ];
        // Добавляем в таблицу слова
        dict.rows.map((val, index) => {
            worksheet.addRow(val)
            console.log(`# ${index}:`, val)
        })

        // сделать первую строку жирным шрифтом
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        try {
            const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
                .then(() => {
                    res.send({
                        status: "success",
                        message: "file successfully downloaded",
                        path: `${path}/users.xlsx`,
                    });
                });
        } catch (error) {
            res.send({
                status: "error",
                message: "Something went wrong",
            });
        }
    }
}
module.exports = new excelController()