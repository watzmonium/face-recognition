import app from "./app";
import config from "./utils/config";

const PORT = config.PORT ? config.PORT : 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
