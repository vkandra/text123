import { BlobServiceClient } from '@azure/storage-blob';

const sasToken =
  process.env.storagesastoken ||
  'sp=racwdli&st=2023-09-13T12:24:36Z&se=2025-03-30T20:24:36Z&sv=2022-11-02&sr=c&sig=5M8Zlztwr1X1vArXCUoZNT7yaWkfvzg1T1i9ciP3Y60%3D'; // Fill string with your SAS token
const containerName = `av123`;
const storageAccountName = process.env.storageresourcename || 'texextraction'; // Fill string with your Storage resource name

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !(!storageAccountName || !sasToken);
};

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient, newContainerName) => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  console.log(containerClient);
  console.log(containerClient.listBlobsFlat());
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    console.log(blob);
    console.log(blob.name);
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${newContainerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
};

const createBlobInContainer = async (containerClient, file) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
  // await blobClient.setMetadata({UserName : 'shubham'});
};

const uploadFileToBlob = async (file, blobExcelDetails) => {
  if (!file) return [];

  const newContainerName = `${blobExcelDetails.containerName}/${blobExcelDetails.subdirectory_name}/${blobExcelDetails.inner_subdirectory_name}`;

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  console.log(blobService);
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(newContainerName);

  // upload file
  await createBlobInContainer(containerClient, file);
  console.log(blobExcelDetails);
  // get list of blobs in container
  // return getBlobsInContainer(containerClient, newContainerName);
  return true;
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
