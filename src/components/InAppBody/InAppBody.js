import './InAppBody.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { changeTabOperation } from '../../actions/extractor';
import Annotation from '../../components/Annotation/Annotation';
import TextExtraction from '../../components/TextExtraction/TextExtraction';
import ObjectDetection from '../../components/ObjectDetection/ObjectDetection';
import Dashboards from '../../components/Dashboards/Dashboards';
import Configuration from '../../components/Configuration/Configuration';
import Templates from '../../components/Templates/Templates';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const InAppBody = (props) => {
  // const { signOut, user } = props;
  // console.log(signOut);
  // console.log(props.userDet);

  const changeMainTabs = (tabNum) => {
    const { extractor } = props;
    extractor.page = tabNum;
    props.dispatch(changeTabOperation(extractor));
  };

  return (
    <div className="inAppBody">
      <button
        // onClick={signOut}
        style={{ display: 'none' }}
        id="hiddenSignOutButton"
      >
        Sign out
      </button>
      {/* <Header userDet={props.userDet} /> */}
      <Header />
      {/* {props.userDet.username.includes('@') ? null : ( */}
      <div className="appBody">
        <div className="bodyContainer">
          <div className="menuContainer">
            <div
              className={`singleMenus ${
                props.extractor.page === 1 ? 'selectedMenu' : ''
              }`}
              id="singleMenu1"
              onClick={() => changeMainTabs(1)}
            >
              <i className="fa-solid fa-list menuicon"></i> &nbsp;&nbsp;
              {props.themeLang.languageWords.Configuration}
            </div>
            <div
              className={`singleMenus ${
                props.extractor.page === 2 ? 'selectedMenu' : ''
              }`}
              id="singleMenu2"
              onClick={() => changeMainTabs(2)}
            >
              <i className="fa-solid fa-arrows-turn-to-dots  menuicon"></i>{' '}
              &nbsp;&nbsp;
              {props.themeLang.languageWords.Text_Extraction}
            </div>

            <div
              className={`singleMenus ${
                props.extractor.page === 4 ? 'selectedMenu' : ''
              }`}
              id="singleMenu4"
              onClick={() => changeMainTabs(4)}
            >
              <i className="fa-solid fa-folder-tree menuicon"></i>
              &nbsp;&nbsp;Templates
            </div>
            <div
              className={`singleMenus ${
                props.extractor.page === 5 ? 'selectedMenu' : ''
              }`}
              id="singleMenu5"
              onClick={() => changeMainTabs(5)}
            >
              <i className="fa-solid fa-chart-line menuicon"></i> &nbsp;&nbsp;
              {props.themeLang.languageWords.Dashboard}
            </div>
          </div>
          <div className="visualBodyContainer">
            {props.extractor.page === 1 ? (
              <Configuration />
            ) : props.extractor.page === 2 ? (
              <TextExtraction />
            ) : props.extractor.page === 4 ? (
              <Templates />
            ) : props.extractor.page === 5 ? (
              <Dashboards />
            ) : null}
          </div>
        </div>
      </div>
      {/* )} */}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(InAppBody);

// const data = {
//   username: 'rnkchr0+te1@gmail.com',
//   pool: {
//     userPoolId: 'ap-south-1_57zIGWaDi',
//     clientId: '3qunog15t0rt9p6vh208iafeoq',
//     client: {
//       endpoint: 'https://cognito-idp.ap-south-1.amazonaws.com/',
//       fetchOptions: {},
//     },
//     advancedSecurityDataCollectionFlag: true,
//     storage: {
//       'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.accessToken':
//         'eyJraWQiOiJKZ1doYXFwbUR0SnlPUHpOWFd6U1d4RStGRHJuV2lIOUtoMDlzeTJwZzFjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNmMzZGEwZS02OGM3LTQ2ODEtYTc4OS00ZTI1M2MzOGFiNDMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2U4cVYyaE1TbiIsImNsaWVudF9pZCI6IjQ2NThzaWprdm9zcTNxOTZ2YXQwODllcGZvIiwib3JpZ2luX2p0aSI6IjMxNTQzYTM1LTI1NTItNDJjNy1hODA2LTFmMzZlOTk5MGRkMCIsImV2ZW50X2lkIjoiYzMxZWU3ZmUtOWJkMy00MGM0LWE5NGMtZTMzNDM4YjQ2NmViIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY3MzQyMzYzMiwiZXhwIjoxNjczNDMxNDYxLCJpYXQiOjE2NzM0Mjc4NjEsImp0aSI6ImY4ZjhlNmViLWVhYzAtNGZkZS05MmUyLWY4MjdjYjQxNWQ0NyIsInVzZXJuYW1lIjoiZTZjM2RhMGUtNjhjNy00NjgxLWE3ODktNGUyNTNjMzhhYjQzIn0.hQxXt8XzTPsc0suVceL5p4GCGTYj_MvdsFfthCI-yepGEPMEA34aVAFbnwrUc1Z64RtDdxMG60PuG_RmN_jjIVQVIVGarziTDwR1u-IAtciYK3pGlB-q4EyHL4b9TLFJxl4Tnt3PX_G9huxE_I5lzJHmHx4OTkE-Kb5iCc6msJzTjlP1Z6xxqJ_R8g5t-GeuANm5eciFedK0a-fEVltkqFHWrrTyWLDkj8pPnTEFlzMnVzUTBZOTpLmzRxGWf70jvIrhz16FSI5mgTWJ3h4np5CEw4HS8vbtVTNf1GVIQpn9Vety6iOGvyZXmbcozHSwEZYrINHq5kDjV4Z-QIFLWQ',
//       'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.clockDrift':
//         '-4',
//       'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.LastAuthUser':
//         'e6c3da0e-68c7-4681-a789-4e253c38ab43',
//       google_current_tip: 'tip1',
//       'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.refreshToken':
//         'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.tvTJTQNzOIzonBOCgIJa97l7INAsD6msnK0m2rst_kpAD3lwVe-7uSyUkHoQcccFdvKOAI5UMYDCTnUA1_JH4eZ3Z7stI_HF3ZlspZdZudh5hBpe8Vkn_VQ1OCoK2hHIPQXsWv_oug2R_NaWZZJzhLSpLJuLmwoj0G3jKUT2g9foF6pQzpCFyhrpOzYMfHtBJsuN59bit13W_1AugdQAs_MTN3mV6waBRS0MG3P3zTfQjR4qX9Yv9pomZaUryOkp-wm3XrxLLqyIce3Vzr0oiYb-3VL-a9EKYoGX9IezcFIWdZ0lLC3l-ie4qivwnlUDu7758pjpjOVP4YfsWn8UCg.jpWXkgUaCNapoNwG.zZ7CCZP5mzF7eEtrjgmTJCh_74SVQI-eBLR-edfX6ojJed_C4QDLhwcEufkL-OGL_8DonCApX3OdCbsPOhl2dDCM2TwWhc6MMJOoRVLzSOW35aQjHs6u5SB-eYqtmORjAbvXLzmt1DKX0CkhTByPDPqehPEN37lNY8tnViOf2EudyOzETBPq24P8ZVtuTbcgrHU9mMdoxProZRHGy2XSXGkhM9L4uxDzPXtziVqieopqPS-IttaeyjAUwD9GiQbqdMVZMsHefABcWzSyqxQjfUxN6Esd91dy2TmJj1qlZ6zWlOz5Dg3rizxgN5OA6TmVO4F_AgXjdAlv9xrlZQgqYbEM7bh0dEhVpBOpQs8vueeujXQkrlCIQ1b_lnGyIlvOJRqAN82cW_DuNWRqOq07TW803JZ23uZWDmf4IQlsM2ZJKFBYuIz52xAjSoRQPVJMSFy_CuOW7qfkL-l-YLyQYsUJi8-_0f1iWNPCtAZdirkBBHotoZTBv72bizubZhHhkgF2ZV0e-dcKVDHJq0iLer8zpVJrgvHGaWM--qr5_rIF5lFnLPOgsow3f_FqrkPqbP2H72FALzLuHPSHrGsQbTyQv2xcqeOKgEoYykVM8MAhJGrQWwP0SRpuMrJ-2yqIQaK3hE_hFobxvu3BP0j2AwtUnpBL3RgDGaiDOv_Dt5G4XiPHS06cR7MLliqz8tV5FMl8RzTV7WaTIKsWHm-3fwxkK8GnPSxGzsrSO51nkwHjdqwwBRLU5JdnZOIwTZg1r92-aWjSFsC99jgQzAw7GGC7Gw3N6u1t9Gyj1CLO_8vnVzTdPrXH6dXpgyVDXvXHooTud6r5DhbFm-koJHUWc5ykZc6L0ehgc5aUlR14Gc7fgEGEpfVyGgiR3eojvMhXWqrmbJJlQdx3JQYo10LKViHTu3Rd-iuF1pXz7wFIEZeSW2yAyc4XwbynaTXLY6QojPOEMAOg-qMr3H4Rh7v_Xgx_2ZPEDgukY0R2-ueiAVG3s8MHDfVD71Ab3yUgxPeLrdnTXSP9bbfKVR2Sh21wJ2jVGis7MSWWeVu1uw1A5VcawIoaPvgyctIE35s8f5SkBfY9rLVgmXLPhYBXegHIG_OQUYwU3b-juI-UsdefvEYeDCqetBOPA2EaUb0lsVkc6fH84l4vx9orMUSEhfw_XmcJtF7fbVM2g684JcjOzUn-RD9CjW5AllWiRsEYnY0OPuNvTFpTasVnztizl88s1sF7m8N_NxadIiBUT2irXOabsOganVqOcEXWTD20-fDcQEB0lqcOuLEtW6n0fW7ZfhxkDmWcpNgdubjeort2lEAojxuFFTPmGUcBR9XhyQ.PNOpJtGiWzcILwYWuPZLMQ',
//       ub_current_user:
//         '{"isLoggedIn":false,"isPaid":false,"lang":"en","locId":2840,"subscription":"free","isPrivate":false}',
//       youtube_current_tip: 'tip1',
//       'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.userData':
//         '{"UserAttributes":[{"Name":"sub","Value":"e6c3da0e-68c7-4681-a789-4e253c38ab43"},{"Name":"email_verified","Value":"true"},{"Name":"name","Value":"Rawnak"},{"Name":"email","Value":"rnkchr0@gmail.com"}],"Username":"e6c3da0e-68c7-4681-a789-4e253c38ab43"}',
//       'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.idToken':
//         'eyJraWQiOiJHalpFRVwvK1IrclwvTE1MN0FCMU4xdGVEdWlhRWNqc0hPQVV5aTVrYzhQZzg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJlNmMzZGEwZS02OGM3LTQ2ODEtYTc4OS00ZTI1M2MzOGFiNDMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9lOHFWMmhNU24iLCJjb2duaXRvOnVzZXJuYW1lIjoiZTZjM2RhMGUtNjhjNy00NjgxLWE3ODktNGUyNTNjMzhhYjQzIiwib3JpZ2luX2p0aSI6IjMxNTQzYTM1LTI1NTItNDJjNy1hODA2LTFmMzZlOTk5MGRkMCIsImF1ZCI6IjQ2NThzaWprdm9zcTNxOTZ2YXQwODllcGZvIiwiZXZlbnRfaWQiOiJjMzFlZTdmZS05YmQzLTQwYzQtYTk0Yy1lMzM0MzhiNDY2ZWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3MzQyMzYzMiwibmFtZSI6IlJhd25hayIsImV4cCI6MTY3MzQzMTQ2MSwiaWF0IjoxNjczNDI3ODYxLCJqdGkiOiJlNDc2ZTQxMS0yOTdiLTRkYmQtODhjZC0xMjUxNGYxYWE4MGMiLCJlbWFpbCI6InJua2NocjBAZ21haWwuY29tIn0.tU1B9IIPYBK9OIctKsEg10zUqMpca-Dy-ArrXt92cBzF8oF1QnQhHIzwUbNk2kwbPRZuSuYAHFVKZEMo4lmZp81y20ly_r0LH_Cdl8pNCBp7lpDZeop6TQs1MwAV5D_YGa9JS-gvht07b19zBaFyMNincBh_cCj5JhhaVFsxt6G51U_hZHBX62umqXMExv46hhizWBZapI2FXuMmF6ydzO3i1Fo9yUw6jNaWJlpTPMOR3gYKRmMyl_L2YqS91-c9blyZZ5fkHbrZjmjGrrau1F6R6FOxhib7sfHDrRoHXDCvao7ugl5eJMP2VYek35dDukgpgMqfLeAMP00AWJcnuA',
//     },
//   },
//   Session: null,
//   client: {
//     endpoint: 'https://cognito-idp.ap-south-1.amazonaws.com/',
//     fetchOptions: {},
//   },
//   signInUserSession: null,
//   authenticationFlowType: 'USER_SRP_AUTH',
//   storage: {
//     'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.accessToken':
//       'eyJraWQiOiJKZ1doYXFwbUR0SnlPUHpOWFd6U1d4RStGRHJuV2lIOUtoMDlzeTJwZzFjPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNmMzZGEwZS02OGM3LTQ2ODEtYTc4OS00ZTI1M2MzOGFiNDMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2U4cVYyaE1TbiIsImNsaWVudF9pZCI6IjQ2NThzaWprdm9zcTNxOTZ2YXQwODllcGZvIiwib3JpZ2luX2p0aSI6IjMxNTQzYTM1LTI1NTItNDJjNy1hODA2LTFmMzZlOTk5MGRkMCIsImV2ZW50X2lkIjoiYzMxZWU3ZmUtOWJkMy00MGM0LWE5NGMtZTMzNDM4YjQ2NmViIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY3MzQyMzYzMiwiZXhwIjoxNjczNDMxNDYxLCJpYXQiOjE2NzM0Mjc4NjEsImp0aSI6ImY4ZjhlNmViLWVhYzAtNGZkZS05MmUyLWY4MjdjYjQxNWQ0NyIsInVzZXJuYW1lIjoiZTZjM2RhMGUtNjhjNy00NjgxLWE3ODktNGUyNTNjMzhhYjQzIn0.hQxXt8XzTPsc0suVceL5p4GCGTYj_MvdsFfthCI-yepGEPMEA34aVAFbnwrUc1Z64RtDdxMG60PuG_RmN_jjIVQVIVGarziTDwR1u-IAtciYK3pGlB-q4EyHL4b9TLFJxl4Tnt3PX_G9huxE_I5lzJHmHx4OTkE-Kb5iCc6msJzTjlP1Z6xxqJ_R8g5t-GeuANm5eciFedK0a-fEVltkqFHWrrTyWLDkj8pPnTEFlzMnVzUTBZOTpLmzRxGWf70jvIrhz16FSI5mgTWJ3h4np5CEw4HS8vbtVTNf1GVIQpn9Vety6iOGvyZXmbcozHSwEZYrINHq5kDjV4Z-QIFLWQ',
//     'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.clockDrift':
//       '-4',
//     'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.LastAuthUser':
//       'e6c3da0e-68c7-4681-a789-4e253c38ab43',
//     google_current_tip: 'tip1',
//     'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.refreshToken':
//       'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.tvTJTQNzOIzonBOCgIJa97l7INAsD6msnK0m2rst_kpAD3lwVe-7uSyUkHoQcccFdvKOAI5UMYDCTnUA1_JH4eZ3Z7stI_HF3ZlspZdZudh5hBpe8Vkn_VQ1OCoK2hHIPQXsWv_oug2R_NaWZZJzhLSpLJuLmwoj0G3jKUT2g9foF6pQzpCFyhrpOzYMfHtBJsuN59bit13W_1AugdQAs_MTN3mV6waBRS0MG3P3zTfQjR4qX9Yv9pomZaUryOkp-wm3XrxLLqyIce3Vzr0oiYb-3VL-a9EKYoGX9IezcFIWdZ0lLC3l-ie4qivwnlUDu7758pjpjOVP4YfsWn8UCg.jpWXkgUaCNapoNwG.zZ7CCZP5mzF7eEtrjgmTJCh_74SVQI-eBLR-edfX6ojJed_C4QDLhwcEufkL-OGL_8DonCApX3OdCbsPOhl2dDCM2TwWhc6MMJOoRVLzSOW35aQjHs6u5SB-eYqtmORjAbvXLzmt1DKX0CkhTByPDPqehPEN37lNY8tnViOf2EudyOzETBPq24P8ZVtuTbcgrHU9mMdoxProZRHGy2XSXGkhM9L4uxDzPXtziVqieopqPS-IttaeyjAUwD9GiQbqdMVZMsHefABcWzSyqxQjfUxN6Esd91dy2TmJj1qlZ6zWlOz5Dg3rizxgN5OA6TmVO4F_AgXjdAlv9xrlZQgqYbEM7bh0dEhVpBOpQs8vueeujXQkrlCIQ1b_lnGyIlvOJRqAN82cW_DuNWRqOq07TW803JZ23uZWDmf4IQlsM2ZJKFBYuIz52xAjSoRQPVJMSFy_CuOW7qfkL-l-YLyQYsUJi8-_0f1iWNPCtAZdirkBBHotoZTBv72bizubZhHhkgF2ZV0e-dcKVDHJq0iLer8zpVJrgvHGaWM--qr5_rIF5lFnLPOgsow3f_FqrkPqbP2H72FALzLuHPSHrGsQbTyQv2xcqeOKgEoYykVM8MAhJGrQWwP0SRpuMrJ-2yqIQaK3hE_hFobxvu3BP0j2AwtUnpBL3RgDGaiDOv_Dt5G4XiPHS06cR7MLliqz8tV5FMl8RzTV7WaTIKsWHm-3fwxkK8GnPSxGzsrSO51nkwHjdqwwBRLU5JdnZOIwTZg1r92-aWjSFsC99jgQzAw7GGC7Gw3N6u1t9Gyj1CLO_8vnVzTdPrXH6dXpgyVDXvXHooTud6r5DhbFm-koJHUWc5ykZc6L0ehgc5aUlR14Gc7fgEGEpfVyGgiR3eojvMhXWqrmbJJlQdx3JQYo10LKViHTu3Rd-iuF1pXz7wFIEZeSW2yAyc4XwbynaTXLY6QojPOEMAOg-qMr3H4Rh7v_Xgx_2ZPEDgukY0R2-ueiAVG3s8MHDfVD71Ab3yUgxPeLrdnTXSP9bbfKVR2Sh21wJ2jVGis7MSWWeVu1uw1A5VcawIoaPvgyctIE35s8f5SkBfY9rLVgmXLPhYBXegHIG_OQUYwU3b-juI-UsdefvEYeDCqetBOPA2EaUb0lsVkc6fH84l4vx9orMUSEhfw_XmcJtF7fbVM2g684JcjOzUn-RD9CjW5AllWiRsEYnY0OPuNvTFpTasVnztizl88s1sF7m8N_NxadIiBUT2irXOabsOganVqOcEXWTD20-fDcQEB0lqcOuLEtW6n0fW7ZfhxkDmWcpNgdubjeort2lEAojxuFFTPmGUcBR9XhyQ.PNOpJtGiWzcILwYWuPZLMQ',
//     ub_current_user:
//       '{"isLoggedIn":false,"isPaid":false,"lang":"en","locId":2840,"subscription":"free","isPrivate":false}',
//     youtube_current_tip: 'tip1',
//     'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.userData':
//       '{"UserAttributes":[{"Name":"sub","Value":"e6c3da0e-68c7-4681-a789-4e253c38ab43"},{"Name":"email_verified","Value":"true"},{"Name":"name","Value":"Rawnak"},{"Name":"email","Value":"rnkchr0@gmail.com"}],"Username":"e6c3da0e-68c7-4681-a789-4e253c38ab43"}',
//     'CognitoIdentityServiceProvider.4658sijkvosq3q96vat089epfo.e6c3da0e-68c7-4681-a789-4e253c38ab43.idToken':
//       'eyJraWQiOiJHalpFRVwvK1IrclwvTE1MN0FCMU4xdGVEdWlhRWNqc0hPQVV5aTVrYzhQZzg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJlNmMzZGEwZS02OGM3LTQ2ODEtYTc4OS00ZTI1M2MzOGFiNDMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV9lOHFWMmhNU24iLCJjb2duaXRvOnVzZXJuYW1lIjoiZTZjM2RhMGUtNjhjNy00NjgxLWE3ODktNGUyNTNjMzhhYjQzIiwib3JpZ2luX2p0aSI6IjMxNTQzYTM1LTI1NTItNDJjNy1hODA2LTFmMzZlOTk5MGRkMCIsImF1ZCI6IjQ2NThzaWprdm9zcTNxOTZ2YXQwODllcGZvIiwiZXZlbnRfaWQiOiJjMzFlZTdmZS05YmQzLTQwYzQtYTk0Yy1lMzM0MzhiNDY2ZWIiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3MzQyMzYzMiwibmFtZSI6IlJhd25hayIsImV4cCI6MTY3MzQzMTQ2MSwiaWF0IjoxNjczNDI3ODYxLCJqdGkiOiJlNDc2ZTQxMS0yOTdiLTRkYmQtODhjZC0xMjUxNGYxYWE4MGMiLCJlbWFpbCI6InJua2NocjBAZ21haWwuY29tIn0.tU1B9IIPYBK9OIctKsEg10zUqMpca-Dy-ArrXt92cBzF8oF1QnQhHIzwUbNk2kwbPRZuSuYAHFVKZEMo4lmZp81y20ly_r0LH_Cdl8pNCBp7lpDZeop6TQs1MwAV5D_YGa9JS-gvht07b19zBaFyMNincBh_cCj5JhhaVFsxt6G51U_hZHBX62umqXMExv46hhizWBZapI2FXuMmF6ydzO3i1Fo9yUw6jNaWJlpTPMOR3gYKRmMyl_L2YqS91-c9blyZZ5fkHbrZjmjGrrau1F6R6FOxhib7sfHDrRoHXDCvao7ugl5eJMP2VYek35dDukgpgMqfLeAMP00AWJcnuA',
//   },
//   keyPrefix: 'CognitoIdentityServiceProvider.3qunog15t0rt9p6vh208iafeoq',
//   userDataKey:
//     'CognitoIdentityServiceProvider.3qunog15t0rt9p6vh208iafeoq.rnkchr0+te1@gmail.com.userData',
// };
