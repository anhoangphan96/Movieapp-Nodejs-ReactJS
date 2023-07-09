//Controller cho route not found khi người dùng gọi tới 1 endpoint bị sai, khi fetch lấy data hoặc lading vào 1 page endpoint sai ở frontend
exports.routeNotFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};
