import './Dashboards.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { assignDashboardData } from '../../actions/documents';

const Dashboards = (props) => {
  // console.log(props.documents.documentDetails);
  var today = new Date();
  var todaymin30 = new Date();

  todaymin30.setDate(todaymin30.getDate() - 30);

  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var dd1 = String(todaymin30.getDate()).padStart(2, '0');
  var mm1 = String(todaymin30.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy1 = todaymin30.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  todaymin30 = yyyy1 + '-' + mm1 + '-' + dd1;

  // console.log(todaymin30);
  // var toD;

  useEffect(() => {
    performCalc();

    document.getElementById('from_date').defaultValue = todaymin30;
    document.getElementById('to_date').defaultValue = today;
    // toD = today;
  }, []);

  const performCalc = () => {
    const { documents } = props;
    // let list = documents.documentDetails;
    let list = [
      {
        documentId: '01194373652efa3d14abc00c881a4920',
        documentType: 'pdf',
        ducumentName: 'User_Guide_for_Endpoint_Privilege_Management_EPM.pdf',
        documentUploadDate: 'Wed, 10 Aug 2022 07:07:37 GMT',
        documentSize: '432681',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/User_Guide_for_Endpoint_Privilege_Management_EPM.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:82da80c1-d0d1-4e5f-846b-b5c5f8b54047',
        processed_date: '2022-08-13',
        template_name: 'Receipt',
      },
      {
        documentId: '1695ea4bee84ed3f4c5a74fa5b6188dd',
        documentType: 'png',
        ducumentName: 'MicrosoftTeams-image.png',
        documentUploadDate: 'Wed, 14 Sep 2022 07:42:59 GMT',
        documentSize: '51116',
        documentPages: 1,
        documentStatus: 'Not Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/MicrosoftTeams-image.png',
        step_fun_execution_id: 'NULL',
        processed_date: 'N/A',
        template_name: 'Bill',
      },
      {
        documentId: '267fe4912204a1d304a075a5ddda6920',
        documentType: 'pdf',
        ducumentName:
          '7cd2cf9f_885d_46ce_a380_82da7e432496_pre_phd_course_work_certificate.pdf',
        documentUploadDate: 'Fri, 26 Aug 2022 10:50:59 GMT',
        documentSize: '201714',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/7cd2cf9f_885d_46ce_a380_82da7e432496_pre_phd_course_work_certificate.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:82da80c1-d0d1-4e5f-846b-b5c5f8b54047',
        processed_date: '2022-09-10',
        template_name: 'Other',
      },
      {
        documentId: '8eb51191a5595a0c5cb890fe7059b99d',
        documentType: 'pdf',
        ducumentName: 'Engine_Build_record_Reference_Document.pdf',
        documentUploadDate: 'Tue, 06 Sep 2022 10:32:32 GMT',
        documentSize: '175041',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/Engine_Build_record_Reference_Document.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:82da80c1-d0d1-4e5f-846b-b5c5f8b54047',
        processed_date: '2022-08-19',
        template_name: 'Receipt',
      },
      {
        documentId: 'bd94d232819a029ec3fefead1ae54618',
        documentType: 'png',
        ducumentName: 'MicrosoftTeams-image+%281%29.png',
        documentUploadDate: 'Wed, 14 Sep 2022 07:42:59 GMT',
        documentSize: '52883',
        documentPages: 1,
        documentStatus: 'Not Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/MicrosoftTeams-image (1).png',
        step_fun_execution_id: 'NULL',
        processed_date: 'N/A',
        template_name: 'Bill',
      },
      {
        documentId: 'bf7cacd416f7ebd292791d80b8314d85',
        documentType: 'pdf',
        ducumentName: 'sv600_c_automatic.pdf',
        documentUploadDate: 'Tue, 30 Aug 2022 07:26:58 GMT',
        documentSize: '409383',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/sv600_c_automatic.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:82da80c1-d0d1-4e5f-846b-b5c5f8b54047',
        processed_date: '2022-09-12',
        template_name: 'Other',
      },
      {
        documentId: 'c7d354ff10c868752f1b032e5b0e55e8',
        documentType: 'pdf',
        ducumentName: 'file-example_PDF_500_kB.pdf',
        documentUploadDate: 'Tue, 30 Aug 2022 07:27:22 GMT',
        documentSize: '469513',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/file-example_PDF_500_kB.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:1cef9015-764f-4016-a72a-688e3a9619da',
        processed_date: '2022-09-13',
        template_name: 'Receipt',
      },
      {
        documentId: 'e1fbd007f30e83ffde06484a1440feac',
        documentType: 'pdf',
        ducumentName: 'AmazonWorkspacesSupplierSetup.pdf',
        documentUploadDate: 'Tue, 30 Aug 2022 07:26:37 GMT',
        documentSize: '146367',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/AmazonWorkspacesSupplierSetup.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:1cef9015-764f-4016-a72a-688e3a9619da',
        processed_date: '2022-09-13',
        template_name: 'Receipt',
      },
      {
        documentId: 'fbbd21ad0f9dda9a12f74b91c6360a2c',
        documentType: 'pdf',
        ducumentName:
          'e172f628_40e9_4b3c_bf8b_0de0a98965f7_repair_record__reference_document_453377_.pdf',
        documentUploadDate: 'Sun, 04 Sep 2022 04:35:28 GMT',
        documentSize: '362596',
        documentPages: 1,
        documentStatus: 'Processed',
        documentDownloadLink:
          'https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/e172f628_40e9_4b3c_bf8b_0de0a98965f7_repair_record__reference_document_453377_.pdf',
        step_fun_execution_id:
          'arn:aws:states:ap-south-1:565442373753:execution:Textract_State_Machine:1cef9015-764f-4016-a72a-688e3a9619da',
        processed_date: '2022-09-02',
        template_name: 'Other',
      },
    ];
    let processedFileList = list.filter((file) => {
      return file.processed_date !== 'N/A';
    });
    let unprocessedFileList = list.filter((file) => {
      return file.processed_date === 'N/A';
    });
    processedFileList.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.processed_date) - new Date(b.processed_date);
    });

    let notProcessedFileList = unprocessedFileList.filter((file) => {
      return file.documentStatus === 'Not Processed';
    });

    let processingFileList = unprocessedFileList.filter((file) => {
      return file.documentStatus !== 'Not Processed';
    });

    console.log(processedFileList);
    console.log(unprocessedFileList);
    console.log(notProcessedFileList);
    console.log(processingFileList);
    documents.processedFileList = processedFileList;
    documents.processedFileListSize = processedFileList.length;
    documents.unprocessedFileListSize = unprocessedFileList.length;
    documents.notProcessedFileListSize = notProcessedFileList.length;
    documents.processingFileListSize = processingFileList.length;

    props.dispatch(assignDashboardData(documents));
  };

  const changeDates = (e) => {
    let fromD = document.getElementById('from_date').value;
    let toD = document.getElementById('to_date').value;
    // console.log(e.target.value);
    // console.log(toD);

    const fromx = new Date(fromD);
    const tox = new Date(toD);

    if (fromx > tox) {
      document.getElementById('from_date').value = '';
    }
  };

  const assembleData = () => {
    let fromD = document.getElementById('from_date').value;
    let toD = document.getElementById('to_date').value;
    console.log(fromD, toD);
  };

  return (
    <div className="dashboards">
      <div className="datesBox">
        <div className="fromDate">
          <label for="fromdate">From :&nbsp;</label>
          <input
            type="date"
            id="from_date"
            name="fromdate"
            placeholder="dd-mm-yyyy"
            max={today}
            onChange={changeDates}
          />
        </div>
        <div className="toDate">
          <label for="todate">To :&nbsp;</label>
          <input
            type="date"
            id="to_date"
            name="todate"
            placeholder="dd-mm-yyyy"
            max={today}
            onChange={changeDates}
          />
        </div>
        <div className="submitDivDate">
          <button onClick={() => assembleData()}>Submit</button>
        </div>
      </div>

      <div className="currentStatsLabel">Current Stats -</div>
      <div className="allCards">
        <div className="singleCard cardNo1">
          <div className="cardName">Not Processed</div>
          <div className="cardValue">
            {props.documents.notProcessedFileListSize}
          </div>
        </div>
        <div className="singleCard cardNo2">
          <div className="cardName">Processing / Queued</div>
          <div className="cardValue">
            {props.documents.processingFileListSize}
          </div>
        </div>
        <div className="singleCard cardNo3">
          <div className="cardName">Processed</div>
          <div className="cardValue">
            {props.documents.processedFileListSize}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    extractor: state.extractor,
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(Dashboards);

// export default Dashboards;
