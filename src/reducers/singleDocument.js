const initialsingleDocumentState = {
  singleDocumentId: 0,
  singleDocumentName: '',
  singleDocumentType: '',
  singleDocumentTotalPages: 0,
  singleDocumentPrimaryContent: [],
  singleDocumentSecondaryContent: [],
  singleDocumentPrimaryKeyValue: [],
  singleDocumentSecondaryKeyValue: [],
  singleDocumentPrimaryTables: [],
  singleDocumentSecondaryTables: [],
  singleDocumentPrimaryRawData: [],
  singleDocumentSecondaryRawData: [],
};

export default function singleDocument(
  state = initialsingleDocumentState,
  action
) {
  switch (action.type) {
    default:
      return state;
  }
}
