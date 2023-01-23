import styled from 'styled-components'

const SplitPaneContainer = styled.div`
  display: flex;
  background: snow;
`

  const Pane = styled.div`
  flex: ${props => props.weight};
  border-left: ${props => props.borderLeft};
  border-right: ${props => props.borderRight}
  background: ${props => props.background};
  border-color: #4B0082;
`

export const SplitScreen = ({
  children,
  leftWeight,
  rightWeight
   }) => {
  const [left, right] = children;
  return (
    <SplitPaneContainer>
       <Pane weight ={leftWeight}>
          {left}
       </Pane>
       <Pane weight ={rightWeight} borderLeft="2px solid #333">
          {right}
       </Pane>
    </SplitPaneContainer>
  )

}