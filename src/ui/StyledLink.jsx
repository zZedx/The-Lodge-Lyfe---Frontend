import { Link } from "react-router-dom"
import styled from "styled-components"

const LinkStyle = styled(Link)`
    color: var(--color-brand-600);
`

const StyledLink = ({children , to}) => {
  return (
    <LinkStyle to={to}>{children}</LinkStyle>
  )
}

export default StyledLink