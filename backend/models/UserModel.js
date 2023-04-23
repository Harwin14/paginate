import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

//buat Schema User
//db.define('namaTable',{field},{Opsi})
const User = db.define(
    "users",
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.STRING,
    },
    {
        freezeTableName: true,
    }
);

export default User;

(async () => {
    await db.sync();
})();
