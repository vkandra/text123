var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "ap-south-1", // Put your aws region here
  accessKeyId: "AKIAYHJX55B4VGECYIIW",
  secretAccessKey: "39/MhQ/V9d2yIAVk2U8U6P8PpQluuqBIn/G/j0jK",
});

const S3_BUCKET =
  "amazon-textract-s3bucket/input_/f6d86aa8-57d4-442a-b159-ee46e97df492";
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  // Set up the payload of what we are sending to the S3 api

  console.log(req.body);

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName + "." + fileType,
    Expires: 3000,
    ContentType: fileType,
    ACL: "public-read-write",
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}.${fileType}`,
    };
    res.json({ success: true, data: { returnData } });
  });
};
