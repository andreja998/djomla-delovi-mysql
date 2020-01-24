const path = require("path");
const fs = require("fs");

const pool = require("../DB");
const upload = require("../Middleware/multer");

exports.deletePhotos = (req, res) => {
  if (req.body.images.length <= 0) {
    return res
      .status(500)
      .json({ message: `You must select at least 1 file.` });
  }

  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.beginTransaction(error => {
      if (error)
        res
          .status(500)
          .json({ message: `Error while starting transaction`, error: error });

      function deleting(i) {
        if (i < req.body.images.length) {
          image = req.body.images[i];
          console.log(`Image for deleting: ${image}\n`);
          connection.query(
            "DELETE FROM `PICTURE` WHERE `PICTURE`.`PICTURE_DEST` = ?",
            [image],
            (error, result) => {
              console.log(`Ovo je result ${JSON.stringify(result)}`);
              if (error) {
                return connection.rollback(() => {
                  return res.status(500).json({
                    message: `Error deleting image ${req.body.images[i]}`,
                    error: error
                  });
                });
              }

              if (result.affectedRows === 0) {
                return res.status(500).json({
                  message: `Image ${req.body.images[i]} does not exist`
                });
              }

              i++;

              if (i === req.body.images.length) {
                // if (x === i) {
                connection.commit(error => {
                  if (error) {
                    return connection.rollback(() => {
                      connection.release();
                    });
                  }

                  for (let x = 0; x < req.body.images.length; x++) {
                    // try {
                    //   console.log(
                    //     `Image trying to be executed: ${req.body.images[x]}`
                    //   );
                    //   fs.unlink(req.body.images[x], err => {
                    //     console.log(`Image successfully deleted: ${err}`);
                    //   });
                    // } catch (error) {
                    //   if (error) console.log("FUCK YOU");
                    //   return res.status(500).json({
                    //     message: `Error deleting image ${req.body.images[x]}`,
                    //     error: error
                    //   });
                    // }
                    console.log(
                      `Image trying to be executed: ${req.body.images[x]}`
                    );
                    fs.unlink(req.body.images[x], err => {
                      console.log(`Image successfully deleted: ${err}`);
                    });
                  }
                  connection.release();

                  return res.status(200).json({
                    messageDatabase: "Successfully deleted images from database"
                  });
                });
                // }
              } else {
                deleting(i);
              }
            }
          );
        }
      }
      deleting(0);
    });
  });
};

exports.getPhotos = (req, res) => {
  pool.getConnection((error, connection) => {
    if (error)
      res.status(500).json({
        message: `Error while getting new connection from pool`,
        error: error
      });

    connection.query(
      "SELECT PICTURE_NAME, PICTURE_DEST FROM `PICTURE` WHERE PART_ID = ?",
      [req.body.part_id],
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: `Something went wrong with our app or servers`,
            error: error
          });
        } else {
          if (result.length <= 0) {
            res.status(200).json({ message: `No Parts found.` });
          } else {
            res.status(200).json({ result: result });
          }
        }
        connection.release();
      }
    );
  });
};

exports.multipleUpload = async (req, res) => {
  try {
    await upload(req, res);
    // console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(500)
        .json({ message: `You must select at least 1 file.` });
    }

    let greske;

    pool.getConnection((error, connection) => {
      if (error)
        res.status(500).json({
          message: `Error while getting new connection from pool`,
          error: error
        });

      connection.beginTransaction(error => {
        if (error)
          res.status(500).json({
            message: `Error while starting transaction`,
            error: error
          });

        let part_id = req.query.part_id;
        console.log("Id dela: " + part_id);

        function addQuery(i) {
          if (i < req.files.length) {
            connection.query(
              "INSERT INTO `PICTURE` (`PICTURE_DEST`, `PART_ID`, `PICTURE_NAME`) VALUES (?,?,?);",
              [req.files[i].path, part_id, req.files[i].filename],
              (error, result) => {
                console.log("Rezultat inserta: ");
                console.log(result);
                if (error) {
                  return connection.rollback(() => {
                    //Kod za brisanje slika
                    for (let x = 0; x < req.files.length; x++) {
                      fs.unlink(req.body.files[x].path, err => {
                        if (err) {
                          console.log(err);
                          return res.status(400).json({ error: err });
                        }
                      });
                    }
                    return res.status(500).json({
                      message: "Error inserting images",
                      error: error
                    });
                  });
                }
                i++;
                if (i === req.files.length) {
                  connection.commit(error => {
                    if (error) {
                      return connection.rollback(() => {
                        connection.release();
                        return res.status(500).json({
                          message: `Error while commiting`,
                          error: error
                        });
                      });
                    }
                    connection.release();
                    return res
                      .status(200)
                      .json({ message: "Successfully added new Images" });
                  });
                } else {
                  addQuery(i);
                }
              }
            );
          } else {
          }
        }

        addQuery(0);
      });
    });

    // return res.send(`Files has been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};
