import styled from 'styled-components'


const ContentLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%; 
  text-align: center;
  padding: 10px;
`
const ProjectContainer = styled.div`
  margin: 0px auto;
  width: 80%;
  height: 80%;
  border: 1px solid #333;
`

const Project = ({children}) => {
 return <ProjectContainer> {children}</ProjectContainer>
}

export const ContentContainer = ({children, title}) => {
  return (
    <ContentLayout>
       <h3>Project Content</h3>
       {title}
        <Project>{children}</Project>
    </ContentLayout>
  )
}