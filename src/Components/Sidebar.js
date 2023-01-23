import React from 'react'
import styled from 'styled-components'


const SideBarItem = ({ className, title, handleClick }) => {
  return (
    <li onClick={() => handleClick(title)} className={className} value={title}>{title}</li>
  )
}

// takes in a list of items and displays them in a column
const SideBarList = ({ className, items, handleClick }) => {
  return (
    <ul className={className}> {items.map((item, i) =>
      <StyledSideBarItem handleClick={handleClick} title={item} key={`${item}-${i}`} />)}
    </ul>
  )
}

const StyledSideBarItem = styled(SideBarItem)`
  margin: 10px 5px;
  border-radius: 4px;
  transition: 100ms ease-in background;
  color: #cccccc;
  // prevent movement on hover
  border: 1px solid transparent; 


  &:hover{
    background: rgba(0,0,0,0.05);
    color: #fff;
    cursor: pointer;
  }
  &:active{
    box-shadow: 0px 0px 0px 0.3px #344888;
  }
  &.active{
    border-left: 1px solid rgba(255,255,255,0.2); 
    background: rgba(0,0,0,0.1);
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`




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
export const Sidebar = ({ onSelection }) => {
  return <StyledSideBarList items={["main", "secondary", "third", "another", "last"]} handleClick={onSelection} />
}