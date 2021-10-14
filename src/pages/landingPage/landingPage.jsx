import './landingPage.css';

//import InputForm from '../../components/inputForm/inputForm';
//import DisplayTable from '../../components/displayTable/displayTable';
import EnhancedTable from '../../components/muiTable/muiTable';
import AlertDialogSlide from '../../components/muiSlideInAlert/muiSlideInAlert';
import CustomizedSnackbars from '../../components/muiSnackBar/muiSnackBar';

import UserProvider from '../../provider/user.provider';
import PageContextProvider from '../../provider/pageControls.provider';

const LandingPage = () => {
   

    return (
        <div className='landing-page'>
            <PageContextProvider>
                <AlertDialogSlide />
                <CustomizedSnackbars />
            </PageContextProvider>
            <UserProvider>
                {/* <InputForm /> */}
                {/* <DisplayTable className='display-table-component' /> */}
                <EnhancedTable />
            </UserProvider>
        </div>
    )
}

export default LandingPage;