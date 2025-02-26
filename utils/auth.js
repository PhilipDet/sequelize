import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";

const generateToken = (user, type) => {
    const expTime =
        Math.floor(Date.now() / 1000) +
        +process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`];

    return jwt.sign(
        {
            exp: expTime,
            data: { id: user.id },
        },
        process.env[`TOKEN_${type.toUpperCase()}_KEY`]
    );
};

export const Authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        res.status(400).send("Mangler påkrævede felter.");
    }

    try {
        const user = await UserModel.findOne({
            attributes: ["id", "username", "password"],
            where: {
                email: email,
                is_active: 1,
            },
        });

        if (!user) return res.status(401).send("Brugeren findes ikke.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Forkert adgangskode.");

        const refreshToken = generateToken(user, "refresh");
        const accessToken = generateToken(user, "access");

        await UserModel.update(
            { refresh_token: refreshToken },
            {
                where: {
                    id: user.id,
                },
            }
        );

        res.json({
            access_token: accessToken,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error!",
            error: error.message,
        });
    }
};

export const Authorize = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader || !bearerHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Token is not accepted" });

    const token = bearerHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.TOKEN_ACCESS_KEY);
        req.user = decode.data;
        next();
    } catch (error) {
        if (error.message === "jwt expired") {
            const user = await UserModel.findOne({
                where: {
                    id: jwt.decode(token).data.id,
                    is_active: 1,
                },
            });

            if (!user?.refresh_token) {
                return res.status(400).json({ message: "Bad request.." });
            }

            try {
                jwt.verify(user.refresh_token, process.env.TOKEN_REFRESH_KEY);
                const accessToken = generateToken(user, "access");
                res.json({ accessToken, update: Date() });
            } catch (error) {
                return res.status(400).json({
                    message: "Refresh token invalid. Please login again.",
                });
            }
        }

        return res
            .status(403)
            .json({ message: "Forbidden", error: error.message });
    }
};
