import styled from 'styled-components'
import { useState } from 'react'

const ModalBackground = styled.div`
  position: fixed; 
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5)
`

const ModalBody = styled.div`
  width: 500px;
  height: 220px;
  position: absolute;
  top: calc(50% - 110px);
  left: calc(50% - 250px);
  border-radius: 24px;
  background: #fff;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header header" "sidebar content" "footer footer";
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const OpenModal = styled.button`
  display: inline-block;
  color: slateblue;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid slateblue;
  border-radius: 3px;
  cursor: pointer;
  display: block;
`

const ExitModal = styled.div`
  background: rgba(0,0,0,0);
  font-size: 2em;
  position: absolute;
  bottom: 0px;
  right: 10px;
  font-size: 14px;
  color: black;
  border: none;
  cursor: pointer;
  padding: 10px 8px;
`

export const Modal = ({ children, title }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <OpenModal onClick={() => setShowModal(true)}>{title}</OpenModal>
      {showModal &&
        (
          <ModalBackground onClick={() => setShowModal(false)}>
            <ModalBody  onClick={e => e.stopPropagation()}>
              {children}
              <ExitModal onClick={() => setShowModal(false)} >close</ExitModal>
            </ModalBody>
          </ModalBackground>
        )}

    </>
  )
}