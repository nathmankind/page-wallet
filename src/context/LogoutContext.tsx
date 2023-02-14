import React, { useState, useMemo, ReactNode } from 'react'

// create context
export const LogoutContext = React.createContext<valueItf | null>(null)


interface valueItf {
    isLogoutOpen: boolean;
    toggleLogout: () => void;
    closeLogout: () => void;
}
interface LogoutITF {
    children:ReactNode
}

export const LogoutProvider = ({ children } : LogoutITF) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)

  function toggleLogout() {
    setIsLogoutOpen(!isLogoutOpen)
  }

  function closeLogout() {
    setIsLogoutOpen(false)
  }

  const value = useMemo(
    () => ({
      isLogoutOpen,
      toggleLogout,
      closeLogout,
    }),
    [isLogoutOpen]
  )

  return <LogoutContext.Provider value={value}>{children}</LogoutContext.Provider>
}