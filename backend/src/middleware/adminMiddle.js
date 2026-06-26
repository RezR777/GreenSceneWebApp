const adminMiddleWare = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin access is required"
        });
    }

    next();
};

export default adminMiddleWare;

