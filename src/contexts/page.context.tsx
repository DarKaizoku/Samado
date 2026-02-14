import React, { useState } from 'react'

interface PageContextProps {
    children: React.ReactElement
}

export interface PageContextInterface {
    page: string
    setPage: (value: string) => void
}

export const PageContext = React.createContext<PageContextInterface>({
    page: 'Accueil',
    setPage: (value: string) => {},
})

export const PageProvider = ({ children }: PageContextProps) => {
    const [data, setData] = useState<string>('Accueil')

    const modifPage = (page: string) => {
        setData(page)
    }

    const contextValue = {
        page: data,
        setPage: modifPage,
    }

    return (
        <PageContext.Provider value={contextValue}>
            {children}
        </PageContext.Provider>
    )
}
