// middleware/authMiddleware.js

const isManager = async (req, res, next) => {
  if(req.user.role === 'manager'){
    next()
  }
  else{
    res
    .status(401)
    .json({ success: false, message: "Not authorized, token failed." });
  }
};

export { isManager };
