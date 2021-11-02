import React from "react"

import { NotFoundContainer } from "./styles"

interface NotFoundProps {
  title: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  return (
    <NotFoundContainer>
      <h2>{title}</h2>
    </NotFoundContainer>
  )
}
