const path = require("path");
const fs = require("fs");
const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "videoList.json"
);

const Trailer = {
  //Method getrailer nhận vào id của movie và 1 callback function
  getTrailer: function (idMovie, cb) {
    fs.readFile(dataPath, (err, fileData) => {
      //Nếu không có lỗi và có tồn tại movieId thì sẽ lấy list video ứng với id của movie đó
      if (!err && idMovie) {
        const listMovieAndTrailer = JSON.parse(fileData).find(
          (movie) => movie.id === Number(idMovie)
        );

        //Nếu như movie không có bất kỳ trailer hay teaser thì sẽ gọi 1 callback function với mảng rỗng còn không thì trả ra theo tiêu chí filter
        if (listMovieAndTrailer) {
          //filter list video theo tiêu chí từ Youtube, official, Trailer hoặc Teaser, sắp xếp theo ngày phát hành mới nhất
          const listTrailerFilter = listMovieAndTrailer.videos
            .filter(
              (video) =>
                video.site === "YouTube" &&
                video.official &&
                (video.type === "Trailer" || video.type === "Teaser")
            )
            .sort((a, b) => b.published_at - a.published_at);
          if (listTrailerFilter.length > 0) {
            //Nếu video có chứa trailer thì lấy trailer đầu tiên còn nếu không thì lấy Teaser đầu tiên
            const trailer =
              listTrailerFilter.find((video) => video.type === "Trailer") ??
              listMovieAndTrailer[0];
            //Gọi callback function với mảng chứa trailer duy nhất
            cb([trailer]);
          } else {
            //Sau khi lọc ra mạng theo tiêu chí yêu cầu thì nếu mảng rỗng sẽ gọi callback function với parameter mãng rỗng
            cb([]);
          }
        } else {
          cb([]);
        }
      }
    });
  },
};
module.exports = Trailer;
