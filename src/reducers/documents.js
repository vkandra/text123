const initialDocumentsState = {
  totalDocuments: 0,
  documentDetails: [
    {
      documentId: 0,
      documentType: '',
      ducumentName: '',
      documentUploadDate: '',
      documentSize: 0,
      documentPages: 0,
      documentProcessing: false,
      documentTextExtracted: false,
      documentDownloadLink: '',
    },
  ],
};

export default function documents(state = initialDocumentsState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
