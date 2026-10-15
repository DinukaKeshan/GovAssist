export const isCitizen = (req, res, next) => {
  if (req.user.role !== "CITIZEN") {
    return res.status(403).json({ message: "Citizen access only" });
  }
  next();
};
