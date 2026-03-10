import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findOne({ email: decoded.email });
        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }
        req.adminId = admin._id;
        req.adminEmail = decoded.email;
        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid token" });
    }
}

export default auth;