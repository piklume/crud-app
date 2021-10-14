import { createContext, useState } from 'react';

export const pageContext = createContext({
    agreement: false,
    setAgreementStatus: () => {}
});

const PageContextProvider = ({ children }) => {

    const [agreement, setAgreement] = useState(false);

    const setAgreementStatus = value => setAgreement(value);

    return (
        <pageContext.Provider value={{
            agreement,
            setAgreementStatus
        }}>
            {children}
        </pageContext.Provider>
    )

}

export default PageContextProvider;