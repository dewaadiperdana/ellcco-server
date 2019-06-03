import express from "express";
import bodyParser from "body-parser";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import io from "socket.io";
import http from "http";
import exphbs from "express-handlebars";
import path from "path";

import Socket from "./sockets/socket";
import firebaseAdminConfig from "./config/firebase";

import jasaRoutes from "./routes/jasa";
import pelangganRoutes from "./routes/pelanggan";
import pemesananRoutes from "./routes/pemesanan";
import tukangRoutes from "./routes/tukang";
import assetsRoutes from "./routes/assets";
import notifikasiRoutes from "./routes/notifikasi";
import pelayananRoutes from "./routes/pelayanan";
import detailPerbaikanRoutes from "./routes/detailperbaikan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const socketServer = io(server);

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig),
  databaseURL: process.env.FIREBASE_DB_URL
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/jasa", jasaRoutes);
app.use("/api/v1/pelanggan", pelangganRoutes);
app.use("/api/v1/pemesanan", pemesananRoutes);
app.use("/api/v1/tukang", tukangRoutes);
app.use("/api/v1/notifikasi", notifikasiRoutes);
app.use("/api/v1/assets", assetsRoutes);
app.use("/api/v1/pelayanan", pelayananRoutes);
app.use("/api/v1/detailperbaikan", detailPerbaikanRoutes);

server.listen(port, () => console.log(`Ellcco is running on port ${port}`));
socketServer.on("connection", socket => {
  new Socket(socket);
});

export { admin, socketServer };
