import React from 'react'
import styled from 'styled-components'


const SideBarItem = ({className, title}) => {
  return (
    <li className={className}>{title}</li>
  )
}
const StyledSideBarItem = styled(SideBarItem)`
  margin: 10px 10px;
  border-radius: 11px;
  border: 1px solid transparent;
  transition: 100ms ease-in all;
  &:hover{
    background: rgba(0,0,0,0.1);
    color: white;
    box-shadow: 0px 0px 0px 0.3px #344888;
  }
`


// takes in a list of items
const SideBarList = ({ className, items }) => {
  return (
    <ul className={className}>{items.map((item,i) => <StyledSideBarItem title={item} key={i} />)}</ul>
  )
}

const StyledSideBarList = styled(SideBarList)`
  line-height: 3;
  list-style: none;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 90px);
  padding-top: 100px;
  padding-left: 0px;
  background: rgba(30, 42, 79);
  color: snow;
  margin: 0;
`;


// render the resulting styled side bar
export const Sidebar = () => {
   return  <StyledSideBarList items={["main", "secondary", "third", "another", "last"]} />          
}