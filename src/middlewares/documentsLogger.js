// import documents from '../reducers/documents';

const documentsLogger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // MIDDLEWARE CODES
    if (typeof action !== 'function') {
      //   console.log('ACTION_TYPE : ', action.type);
    }

    const fetchedAllDocsData = {
      totalDocuments: 0,
      documentDetails: [],
      processedFileList: [],
      notProcessedFileList: [],
    };
    if (action.type === 'ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA') {
      var totalDocs = action.data.Document_Details.length;

      fetchedAllDocsData.totalDocuments = totalDocs;
      // console.log(action.data.Document_Details.length);
      for (var i = 0; i < totalDocs; i++) {
        fetchedAllDocsData.documentDetails.push({
          documentId: action.data.Document_Details[i].doc_id.S,
          documentType: action.data.Document_Details[i].documentType.S,
          ducumentName: action.data.Document_Details[i].document_name.S,
          documentUploadDate:
            action.data.Document_Details[i].documentUploadDate.S,
          documentSize: action.data.Document_Details[i].documentSize.S,
          documentPages: 1,
          documentStatus: action.data.Document_Details[i].doc_status.S,
          documentDownloadLink: action.data.Document_Details[i].download_link.S,
          step_fun_execution_id:
            action.data.Document_Details[i].step_fun_execution_id.S,
        });
      }
      fetchedAllDocsData.documentDetails.push({
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/sample.pdf',
        documentId: '4b41a3475132bd861b30a878e6a',
        documentPages: 1,
        documentSize: '3028',
        documentStatus: 'Processing',
        documentType: 'pdf',
        documentUploadDate: 'Thu, 25 Aug 2022 20:13:21 GMT',
        ducumentName: 'hello.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:59e42647-8b56-414e-a0ab-2ad1b879aec1',
      });
      fetchedAllDocsData.processedFileList =
        fetchedAllDocsData.documentDetails.filter((file) => {
          return file.documentStatus === 'Processed';
        });
      fetchedAllDocsData.notProcessedFileList =
        fetchedAllDocsData.documentDetails.filter((file) => {
          return (
            file.documentStatus === 'Not Processed' ||
            file.documentStatus === 'Processing'
          );
        });
      //   console.log(fetchedAllDocsData);
      action.data = fetchedAllDocsData;
    }
    next(action);
  };

export default documentsLogger;
