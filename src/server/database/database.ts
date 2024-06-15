import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_leiaja",
    port: 3306,
});

export const consult = async (sql: string, values: any[], msgReject = "Ocorreu um erro") => {
    try {
        return await new Promise((resolve, reject) => {
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Erro na consulta ao banco de dados:", err);
                    reject(`${msgReject}: ${err.message}`);
                } else {
                    resolve(result);
                }
            });
        });
    } catch (error) {
        console.log("Erro ao executar a promessa:", error);
        throw new Error(msgReject);
    }
};


// docker run --name root -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql