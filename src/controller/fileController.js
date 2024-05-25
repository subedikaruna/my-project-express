export let handleSingleFileController = async (req, res, next) => {
  let link = `http://localhost:8001/${req.file.filename}`;
  res.status(200).json({
    success: true,
    message: `file saved successfully`,
    result: link,
  });
  //console.log(req.body)
  //console.log(req.file)
};
export let handleMultipleFileController = async (req, res, next) => {
  console.log(req.files);
  let link = req.files.map((value, i) => {
    return `http://localhost:8001/${value.filename}`;
  });
  res.status(200).json({
    success: true,
    message: `file saved successfully`,
    result: link,
  });
};
