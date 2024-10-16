import express from "express"

import cors from "cors";
import { connectDb } from "./config/db.js";
import BookingRoutes from "./routes/BookingRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import centreRoutes from "./routes/centre.routes.js"
import sportRoutes from "./routes/sport.routes.js"
import courtRoutes from "./routes/court.routes.js"
import scheduleRoutes from "./routes/schedule.routes.js"


const app = express()
const port = 4000;
app.use(express.json())
app.use(cors())
connectDb();
app.use("/api/user", userRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/centre", centreRoutes);
app.use("/api/sport", sportRoutes);
app.use("/api/court", courtRoutes);
app.use("/api/schedule", scheduleRoutes);


app.listen(port, () => {
    console.log(`server is on on http//:localhost:${port}`)
})