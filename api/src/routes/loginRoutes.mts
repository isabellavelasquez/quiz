import { loginUser } from "../controllers/loginController.mjs";

export const loginRouter = express.Router()

loginRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            res.status(400).json({ message: "All fields required" });
        } else {
            const loggedInUser = await loginUser(email, password);

            if(!loggedInUser) {
                res.status(400).json({ message: "Incorrect email or password"});
            } else {
                const token = jwt.sign(loggedInUser, process.env.JWT_SECRET as string);

                const currentDate = new Date();
                currentDate.setHours(currentDate.getHours() + 1);

                res.cookie("login", token, {
                    expires: currentDate,
                    httpOnly: false,
                });

                res.status(200).json(loggedInUser);
                console.log("logged in successfully");
            }
        }   
    } catch (error :any) {
        res.status(500).json({ error: error.message});
    }
})