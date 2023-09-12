import { BlobServiceClient } from '@azure/storage-blob';

const sasToken =
  process.env.storagesastoken ||
  '?sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciyx&se=2025-12-31T12:00:50Z&st=2023-02-14T04:00:50Z&spr=https,http&sig=bwh%2BH2GsBEjNImmf11CNzHclVXKfZnjXKhUR%2B7jY5OI%3D'; // Fill string with your SAS token
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
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
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

  // get list of blobs in container
  return getBlobsInContainer(containerClient, newContainerName);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
