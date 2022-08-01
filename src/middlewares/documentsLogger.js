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
    };
    if (action.type === 'ASSIGN_ALL_RECEIVED_DOCUMENTS_DATA') {
      var totalDocs = action.data.Document_Details.length;

      fetchedAllDocsData.totalDocuments = totalDocs;

      for (var i = 0; i < totalDocs; i++) {
        fetchedAllDocsData.documentDetails.push({
          documentId: action.data.Document_Details[i].doc_id.S,
          documentType: action.data.Document_Details[i].documentType.S,
          ducumentName: action.data.Document_Details[i].document_name.S,
          documentUploadDate:
            action.data.Document_Details[i].documentUploadDate.S,
          documentSize: action.data.Document_Details[i].documentSize.S,
          documentPages: 1,
          documentStatus: action.data.Document_Details[i].status.S,
          documentDownloadLink: action.data.Document_Details[i].download_link.S,
        });
      }
      //   console.log(fetchedAllDocsData);
      action.data = fetchedAllDocsData;
    }
    next(action);
  };

export default documentsLogger;
